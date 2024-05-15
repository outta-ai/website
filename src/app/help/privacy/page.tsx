import { Info } from "@payload/types";

export default async function PrivacyPage() {
	const request = await fetch(
		`${process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL}/api/globals/info`,
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
			<h2 className="text-3xl text-center font-bold">개인정보처리방침</h2>
			<p className="text-sm">{data.privacy}</p>
		</div>
	);
}
