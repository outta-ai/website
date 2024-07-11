import { Langauges } from "@/lib/i18n";
import { redirect } from "next/navigation";

export default async function AuthPage() {
	redirect("/auth/login");
}

export async function generateStaticParams() {
	return Langauges.map((lng) => ({ lng }));
}
