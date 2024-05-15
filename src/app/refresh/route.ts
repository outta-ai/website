import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
	if (!process.env.REFRESH_KEY) {
		return new Response("No refresh key", { status: 500 });
	}

	const json = await req.json();
	if (json.key !== process.env.REFRESH_KEY) {
		return new Response("Invalid key", { status: 401 });
	}

	revalidateTag("payload");
	return new Response("Refreshed", { status: 200 });
}
