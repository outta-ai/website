import { Info } from "@payload/types";

export default async function TermsPage() {
	const request = await fetch(
		`${process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL}/api/globals/info`,
		{
			cache: "default",
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