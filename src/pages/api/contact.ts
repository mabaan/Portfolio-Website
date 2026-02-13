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

function getServerEnv(name: string) {
  if (typeof process === "undefined" || !process.env) {
    return "";
  }
  return (process.env[name] || "").trim();
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function parseAllowedOrigins(raw: string | undefined) {
  return (raw || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function isAllowedOrigin(request: Request, allowedOrigins: string[]) {
  if (allowedOrigins.length === 0) {
    return true;
  }

  const origin = request.headers.get("origin");
  if (!origin) {
    return false;
  }

  return allowedOrigins.includes(origin);
}

async function safeParseJSON(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const MAX_BODY_BYTES = 20_000;

    // Read secrets at request time from runtime environment (never baked into build output).
    const AIRTABLE_API_KEY =
      getServerEnv("AIRTABLE_API_KEY") || getServerEnv("AIRTABLE_TOKEN");
    const AIRTABLE_BASE_ID = getServerEnv("AIRTABLE_BASE_ID");
    const AIRTABLE_TABLE_NAME = getServerEnv("AIRTABLE_TABLE_NAME");

    const FIELD_FULL_NAME = getServerEnv("AIRTABLE_FIELD_FULL_NAME") || "Full Name";
    const FIELD_EMAIL = getServerEnv("AIRTABLE_FIELD_EMAIL") || "Email";
    const FIELD_COMPANY = getServerEnv("AIRTABLE_FIELD_COMPANY") || "Company";
    const FIELD_REASON = getServerEnv("AIRTABLE_FIELD_REASON") || "Reason";
    const FIELD_MESSAGE = getServerEnv("AIRTABLE_FIELD_MESSAGE") || "Message";
    const ALLOWED_ORIGINS = parseAllowedOrigins(getServerEnv("CONTACT_ALLOWED_ORIGINS"));

    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return jsonResponse(415, { error: "Unsupported media type. Use application/json." });
    }

    const contentLengthHeader = request.headers.get("content-length");
    const contentLength = Number(contentLengthHeader || "0");
    if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
      return jsonResponse(413, { error: "Payload too large." });
    }

    if (!isAllowedOrigin(request, ALLOWED_ORIGINS)) {
      return jsonResponse(403, { error: "Origin not allowed." });
    }

    let payload: ContactPayload;
    let rawBody = "";

    try {
      rawBody = await request.text();
    } catch {
      return jsonResponse(400, { error: "Invalid request body. Expected JSON payload." });
    }

    if (rawBody.length > MAX_BODY_BYTES) {
      return jsonResponse(413, { error: "Payload too large." });
    }

    try {
      payload = JSON.parse(rawBody) as ContactPayload;
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
      console.error("Contact API is missing Airtable environment configuration.");
      return jsonResponse(500, {
        error: "Contact form is temporarily unavailable.",
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
  } catch (error) {
    console.error("Unhandled contact API failure", error);
    return jsonResponse(500, {
      error: "Contact form is temporarily unavailable.",
    });
  }
};
