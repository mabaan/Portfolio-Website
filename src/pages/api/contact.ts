import type { APIRoute } from "astro";

export const prerender = false;

type ContactPayload = {
  fullName: string;
  email: string;
  company: string;
  reason: string;
  message: string;
  website?: string;
};

function jsonResponse(status: number, payload: Record<string, unknown>) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function safeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function safeParseJSON(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export const POST: APIRoute = async ({ request }) => {
  // Read secrets at request time from runtime environment (never baked into build output).
  const AIRTABLE_API_KEY = (
    process.env.AIRTABLE_API_KEY ||
    process.env.AIRTABLE_TOKEN ||
    ""
  ).trim();
  const AIRTABLE_BASE_ID = (process.env.AIRTABLE_BASE_ID || "").trim();
  const AIRTABLE_TABLE_NAME = (process.env.AIRTABLE_TABLE_NAME || "").trim();

  const FIELD_FULL_NAME = process.env.AIRTABLE_FIELD_FULL_NAME || "Full Name";
  const FIELD_EMAIL = process.env.AIRTABLE_FIELD_EMAIL || "Email";
  const FIELD_COMPANY = process.env.AIRTABLE_FIELD_COMPANY || "Company";
  const FIELD_REASON = process.env.AIRTABLE_FIELD_REASON || "Reason";
  const FIELD_MESSAGE = process.env.AIRTABLE_FIELD_MESSAGE || "Message";

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return jsonResponse(400, { error: "Invalid request body. Expected JSON payload." });
  }

  const fullName = safeString(payload?.fullName);
  const email = safeString(payload?.email).toLowerCase();
  const company = safeString(payload?.company);
  const reason = safeString(payload?.reason);
  const message = safeString(payload?.message);
  const website = safeString(payload?.website);

  // Honeypot trap: silently accept bot submissions.
  if (website) {
    return jsonResponse(200, { success: true });
  }

  if (!fullName || fullName.length < 2 || fullName.length > 100) {
    return jsonResponse(400, { error: "Full name must be between 2 and 100 characters." });
  }

  if (!isValidEmail(email)) {
    return jsonResponse(400, { error: "Please provide a valid email address." });
  }

  if (company.length > 100) {
    return jsonResponse(400, { error: "Company name must be 100 characters or fewer." });
  }

  if (!reason || reason.length > 120) {
    return jsonResponse(400, { error: "Reason is required and must be 120 characters or fewer." });
  }

  if (!message || message.length < 10 || message.length > 5000) {
    return jsonResponse(400, { error: "Message must be between 10 and 5000 characters." });
  }

  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
    return jsonResponse(500, {
      error:
        "Contact form is not configured on the server. Add AIRTABLE_API_KEY (or AIRTABLE_TOKEN), AIRTABLE_BASE_ID, and AIRTABLE_TABLE_NAME to .env.",
    });
  }

  const fields: Record<string, string> = {
    [FIELD_FULL_NAME]: fullName,
    [FIELD_EMAIL]: email,
    [FIELD_REASON]: reason,
    [FIELD_MESSAGE]: message,
  };

  if (company) {
    fields[FIELD_COMPANY] = company;
  }

  const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
    AIRTABLE_TABLE_NAME
  )}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const airtableResponse = await fetch(airtableUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [{ fields }],
        typecast: true,
      }),
      signal: controller.signal,
    });

    if (!airtableResponse.ok) {
      const errorBody = await safeParseJSON(airtableResponse);
      console.error("Airtable submission failed", {
        status: airtableResponse.status,
        body: errorBody,
      });
      return jsonResponse(502, {
        error: "Unable to submit right now. Please try again in a moment.",
      });
    }

    const successBody = await safeParseJSON(airtableResponse);
    const submissionId =
      successBody && typeof successBody === "object" && "records" in successBody
        ? (successBody as { records?: Array<{ id?: string }> }).records?.[0]?.id
        : undefined;

    return jsonResponse(200, {
      success: true,
      submissionId: submissionId || null,
    });
  } catch (error) {
    console.error("Contact API error", error);
    return jsonResponse(502, {
      error: "Unable to submit right now. Please try again in a moment.",
    });
  } finally {
    clearTimeout(timeout);
  }
};
