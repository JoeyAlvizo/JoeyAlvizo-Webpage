/**
 * Cloudflare Pages Function: POST /api/contact
 *
 * Handles contact form submissions with:
 * 1. Turnstile verification (anti-bot)
 * 2. Form field validation
 * 3. Email dispatch via Cloudflare Email Service binding
 *
 * Environment variables required:
 *   - TURNSTILE_SECRET_KEY: Cloudflare Turnstile secret key
 *   - CONTACT_EMAIL_FROM: Sender email address (must be on a Cloudflare-managed domain)
 *
 * Bindings required:
 *   - SEND_EMAIL: Cloudflare Email Service binding (configured in wrangler.toml)
 */

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

/**
 * Handle CORS preflight requests.
 */
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

/**
 * Handle POST requests for contact form submissions.
 */
export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    // --- 1. Parse request body ---
    let body;
    try {
      body = await request.json();
    } catch {
      return jsonResponse(400, {
        success: false,
        message: "Invalid JSON in request body.",
      });
    }

    const {
      name,
      email,
      phone,
      business,
      requestType,
      message,
      "cf-turnstile-response": turnstileToken,
    } = body;

    // --- 2. Verify Turnstile token ---
    if (!turnstileToken) {
      return jsonResponse(403, {
        success: false,
        message: "Missing Turnstile verification. Please complete the challenge.",
      });
    }

    const turnstileResult = await verifyTurnstile(
      turnstileToken,
      env.TURNSTILE_SECRET_KEY,
      request.headers.get("CF-Connecting-IP")
    );

    if (!turnstileResult.success) {
      return jsonResponse(403, {
        success: false,
        message: "Turnstile verification failed. Please try again.",
      });
    }

    // --- 3. Validate form fields ---
    const validationError = validateFields({ name, email, message });
    if (validationError) {
      return jsonResponse(400, {
        success: false,
        message: validationError,
      });
    }

    // --- 4. Send email via Cloudflare Email Service ---
    const emailBody = buildEmailBody({
      name,
      email,
      phone,
      business,
      requestType,
      message,
    });

    await env.SEND_EMAIL.send({
      to: [{ email: "contact@joeyalvizo.com" }],
      from: {
        email: env.CONTACT_EMAIL_FROM,
        name: "Portfolio Contact Form",
      },
      subject: `New Contact: ${requestType || "General"} — ${name}`,
      text: emailBody,
    });

    // --- 5. Return success ---
    return jsonResponse(200, {
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return jsonResponse(500, {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}

// ─── Helpers ────────────────────────────────────────────────────────

/**
 * Verify a Turnstile token against Cloudflare's siteverify endpoint.
 */
async function verifyTurnstile(token, secretKey, remoteIp) {
  const formData = new URLSearchParams({
    secret: secretKey,
    response: token,
    ...(remoteIp && { remoteip: remoteIp }),
  });

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    }
  );

  return response.json();
}

/**
 * Validate required form fields and email format.
 * Returns an error message string, or null if valid.
 */
function validateFields({ name, email, message }) {
  if (!name || !name.trim()) {
    return "Name is required.";
  }
  if (!email || !email.trim()) {
    return "Email is required.";
  }
  if (!message || !message.trim()) {
    return "Message is required.";
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return "Please provide a valid email address.";
  }

  return null;
}

/**
 * Build a plain-text email body from form fields.
 */
function buildEmailBody({ name, email, phone, business, requestType, message }) {
  const lines = [
    "═══════════════════════════════════════",
    "  New Contact Form Submission",
    "═══════════════════════════════════════",
    "",
    `Name:          ${name}`,
    `Email:         ${email}`,
  ];

  if (phone) lines.push(`Phone:         ${phone}`);
  if (business) lines.push(`Business:      ${business}`);
  if (requestType) lines.push(`Request Type:  ${requestType}`);

  lines.push(
    "",
    "───────────────────────────────────────",
    "  Message",
    "───────────────────────────────────────",
    "",
    message,
    "",
    "═══════════════════════════════════════",
    `Sent at: ${new Date().toISOString()}`
  );

  return lines.join("\n");
}

/**
 * Return a JSON Response with CORS headers.
 */
function jsonResponse(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...CORS_HEADERS,
    },
  });
}
