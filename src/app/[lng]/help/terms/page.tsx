import { Langauges } from "@/lib/i18n";
import { Info } from "@payload/types";

export default async function TermsPage() {
	const request = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/globals/info`,
		{
			next: {
				revalidate: 5 * 60,
				tags: ["payload"],
			},
		},
	);

	const dataRaw = await request.json();
	const data = dataRaw as Info;

	return (
		<div className="mt-48">
			<h2 className="text-3xl text-center font-bold">이용약관</h2>
			<p className="text-sm">{data.terms}</p>
		</div>
	);
}

export async function generateStaticParams() {
	return Langauges.map((lng) => ({ lng }));
}
