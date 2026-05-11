type ContactPayload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
  website?: string;
};

type Context = {
  request: Request;
  env: {
    RESEND_API_KEY?: string;
    CONTACT_TO_EMAIL?: string;
    CONTACT_FROM_EMAIL?: string;
  };
};

const DEFAULT_CONTACT_TO_EMAIL = "coldchainsoporteweb@gmail.com";
const DEFAULT_CONTACT_FROM_EMAIL = "Coldchain Web <onboarding@resend.dev>";

function json(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

export async function onRequestPost(context: Context): Promise<Response> {
  const { request, env } = context;

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return json({ success: false, message: "Payload inválido." }, 400);
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const interest = payload.interest?.trim() ?? "";
  const message = payload.message?.trim() ?? "";
  const company = payload.company?.trim() ?? "";
  const phone = payload.phone?.trim() ?? "";

  if (payload.website) {
    return json({ success: true });
  }

  if (!name || !email || !interest || !message) {
    return json({ success: false, message: "Faltan campos obligatorios." }, 400);
  }

  const toEmail = env.CONTACT_TO_EMAIL ?? DEFAULT_CONTACT_TO_EMAIL;
  const fromEmail = env.CONTACT_FROM_EMAIL ?? DEFAULT_CONTACT_FROM_EMAIL;
  const resendKey = env.RESEND_API_KEY;

  if (!resendKey) {
    return json(
      {
        success: false,
        message: "Falta RESEND_API_KEY en el servidor.",
      },
      500
    );
  }

  const subject = `Nuevo contacto web - ${interest}`;

  const html = `
    <h2>Nuevo formulario de contacto</h2>
    <p><strong>Nombre:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Teléfono:</strong> ${phone || "No indicado"}</p>
    <p><strong>Empresa:</strong> ${company || "No indicada"}</p>
    <p><strong>Interés:</strong> ${interest}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${message.replace(/\n/g, "<br />")}</p>
  `;

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject,
      html,
    }),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    return json(
      {
        success: false,
        message: "Resend rechazó el envío.",
        providerError: errorText,
      },
      502
    );
  }

  return json({ success: true });
}
