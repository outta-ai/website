import { Langauges } from "@/lib/i18n";

export default function PlaygroundPage() {
	return (
		<div className="w-full h-dvh flex justify-center items-center">
			<h1 className="text-3xl text-center font-sbaggro">Comming Soon</h1>
		</div>
	);
}

export async function generateStaticParams() {
	return Langauges.map((lng) => ({ lng }));
}
