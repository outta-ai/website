import { Langauges } from "@/lib/i18n";

export default function BrandPage() {}

export async function generateStaticParams() {
	return Langauges.map((lng) => ({ lng }));
}
