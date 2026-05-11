import { onRequestPost as contactPost } from "./contact";

type Context = {
	request: Request;
};

function json(body: Record<string, unknown>, status = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			"content-type": "application/json; charset=utf-8",
			"cache-control": "no-store",
		},
	});
}

export async function onRequest(context: Context): Promise<Response> {
	const url = new URL(context.request.url);
	const pathname = url.pathname.replace(/\/+$/, "");

	if (pathname === "/api/contact") {
		if (context.request.method !== "POST") {
			return json({ success: false, message: "Method not allowed." }, 405);
		}

		return contactPost(context as Parameters<typeof contactPost>[0]);
	}

	return json({ success: false, message: "Not found." }, 404);
}
