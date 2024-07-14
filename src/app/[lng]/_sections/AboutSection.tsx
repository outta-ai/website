import { RichText, type StyledText } from "@/components/RichText";

type Props = {
	summary: StyledText;
	description: StyledText;
};

export function AboutSection({ summary, description }: Props) {
	return (
		<section
			id="about-us"
			className="w-full h-screen relative overflow-auto bg-slate-50"
		>
			<div className="h-full py-16 sm:py-32 px-3 lg:px-48 flex flex-col">
				<h2 className="font-sbaggro font-light uppercase text-sm">
					&lt;About us&gt;
				</h2>
				<RichText className="font-pretendard text-3xl mt-8">{summary}</RichText>
				<div className="flex-1" />
				<RichText className="font-pretendard text-lg w-full max-w-[574px]">
					{description}
				</RichText>
			</div>
		</section>
	);
}
