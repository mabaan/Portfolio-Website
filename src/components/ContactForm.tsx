import React, { useMemo, useState } from "react";

type FormValues = {
  fullName: string;
  email: string;
  company: string;
  reason: string;
  message: string;
  website: string;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

type FeedbackTone = {
  title: string;
  icon: React.ReactNode;
  borderColor: string;
  iconColor: string;
  iconBackground: string;
  panelBackground: string;
};

const REASON_OPTIONS = [
  "Project Collaboration",
  "Internship / Job Opportunity",
  "Freelance Work",
  "Research Collaboration",
  "General Inquiry",
];

const initialValues: FormValues = {
  fullName: "",
  email: "",
  company: "",
  reason: REASON_OPTIONS[0],
  message: "",
  website: "",
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");

  const remainingChars = useMemo(() => 1200 - values.message.length, [values.message.length]);

  const onFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validateClient = () => {
    if (values.fullName.trim().length < 2) {
      return "Please enter your full name.";
    }
    if (!isValidEmail(values.email.trim())) {
      return "Please provide a valid email address.";
    }
    if (!values.reason.trim()) {
      return "Please select a reason for reaching out.";
    }
    if (values.message.trim().length < 10) {
      return "Your message should be at least 10 characters.";
    }
    if (values.message.length > 1200) {
      return "Your message is too long. Keep it under 1200 characters.";
    }
    return "";
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitState === "submitting") {
      return;
    }

    const validationError = validateClient();
    if (validationError) {
      setSubmitState("error");
      setFeedback(validationError);
      return;
    }

    setSubmitState("submitting");
    setFeedback("Submitting your message...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: values.fullName.trim(),
          email: values.email.trim(),
          company: values.company.trim(),
          reason: values.reason.trim(),
          message: values.message.trim(),
          website: values.website.trim(),
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Unable to submit right now. Please try again.");
      }

      setSubmitState("success");
      setFeedback("Message sent successfully. I will get back to you soon.");
      setValues(initialValues);
    } catch (error) {
      setSubmitState("error");
      setFeedback(error instanceof Error ? error.message : "Something went wrong while submitting.");
    }
  };

  const feedbackTone: FeedbackTone | null =
    submitState === "success"
      ? {
          title: "Message sent",
          icon: (
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8.2 8.2a1 1 0 01-1.414 0l-3.8-3.8a1 1 0 011.414-1.414l3.093 3.093 7.493-7.493a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ),
          borderColor: "rgba(34, 197, 94, 0.45)",
          iconColor: "var(--success)",
          iconBackground: "rgba(34, 197, 94, 0.15)",
          panelBackground: "linear-gradient(120deg, rgba(34, 197, 94, 0.14), rgba(34, 197, 94, 0.05))",
        }
      : submitState === "error"
        ? {
            title: "Submission failed",
            icon: (
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path
                  fillRule="evenodd"
                  d="M18 10A8 8 0 112 10a8 8 0 0116 0zM9 6a1 1 0 112 0v4a1 1 0 11-2 0V6zm2 8a1 1 0 10-2 0 1 1 0 002 0z"
                  clipRule="evenodd"
                />
              </svg>
            ),
            borderColor: "rgba(239, 68, 68, 0.5)",
            iconColor: "var(--danger)",
            iconBackground: "rgba(239, 68, 68, 0.15)",
            panelBackground: "linear-gradient(120deg, rgba(239, 68, 68, 0.13), rgba(239, 68, 68, 0.05))",
          }
        : submitState === "submitting"
          ? {
              title: "Submitting",
              icon: (
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" className="opacity-30" />
                  <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              ),
              borderColor: "rgba(217, 119, 6, 0.45)",
              iconColor: "var(--color-accent)",
              iconBackground: "rgba(217, 119, 6, 0.16)",
              panelBackground: "linear-gradient(120deg, rgba(217, 119, 6, 0.14), rgba(217, 119, 6, 0.06))",
            }
          : null;

  return (
    <form
      onSubmit={onSubmit}
      className="relative overflow-hidden rounded-3xl border-2 border-muted bg-surface p-6 md:p-8 shadow-lg"
      noValidate
    >
      <div
        className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full blur-3xl opacity-10"
        style={{ background: "var(--color-accent)" }}
      />

      <div className="relative">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary">Send a Message</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-text-primary">Full Name</span>
            <input
              type="text"
              name="fullName"
              autoComplete="name"
              placeholder="Your full name"
              value={values.fullName}
              onChange={onFieldChange}
              maxLength={100}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-muted bg-bg text-text-primary placeholder-text-secondary/50 transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-text-primary">Email</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={values.email}
              onChange={onFieldChange}
              maxLength={120}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-muted bg-bg text-text-primary placeholder-text-secondary/50 transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-text-primary">Company</span>
            <input
              type="text"
              name="company"
              autoComplete="organization"
              placeholder="Optional"
              value={values.company}
              onChange={onFieldChange}
              maxLength={100}
              className="w-full px-4 py-3 rounded-xl border-2 border-muted bg-bg text-text-primary placeholder-text-secondary/50 transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-text-primary">Reason</span>
            <select 
              name="reason" 
              value={values.reason} 
              onChange={onFieldChange} 
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-muted bg-bg text-text-primary transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 cursor-pointer"
            >
              {REASON_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="mt-5 block">
          <span className="mb-2 block text-sm font-semibold text-text-primary">Message</span>
          <textarea
            name="message"
            placeholder="What are you building, what problem are you solving, and what kind of support do you need?"
            value={values.message}
            onChange={onFieldChange}
            rows={7}
            maxLength={1200}
            required
            className="w-full px-4 py-3 rounded-xl border-2 border-muted bg-bg text-text-primary placeholder-text-secondary/50 transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none"
          />
          <span className="mt-1.5 block text-xs text-text-secondary">{remainingChars} characters remaining</span>
        </label>

        {/* Honeypot field for bots */}
        <input
          type="text"
          name="website"
          value={values.website}
          onChange={onFieldChange}
          className="sr-only"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            type="submit"
            className="btn px-8 py-3.5 text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            disabled={submitState === "submitting"}
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            {submitState === "submitting" ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                Send Message
              </>
            )}
          </button>
          <p className="text-xs md:text-sm text-text-secondary text-left sm:text-right">
            Your details are encrypted in transit and stored securely.
          </p>
        </div>

        {feedbackTone && feedback && (
          <div
            className="mt-4 rounded-2xl border p-4 shadow-sm"
            style={{ borderColor: feedbackTone.borderColor, background: feedbackTone.panelBackground }}
            role={submitState === "error" ? "alert" : "status"}
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="flex items-start gap-3">
              <span
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                style={{ color: feedbackTone.iconColor, backgroundColor: feedbackTone.iconBackground }}
              >
                {feedbackTone.icon}
              </span>
              <div>
                <p className="text-sm font-semibold text-text-primary">{feedbackTone.title}</p>
                <p className="text-sm text-text-secondary mt-0.5">{feedback}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
