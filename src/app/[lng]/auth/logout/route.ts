import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(_req: Request) {
	cookies().delete("OUTTA_ACCESS_TOKEN");
	cookies().delete("OUTTA_REFRESH_TOKEN");

	redirect("/?logout");
}
