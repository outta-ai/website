import Image from "next/image";

import { RichText, type StyledText } from "@/components/RichText";

import IconLogo from "@/assets/icons/icon_logo.svg";
import imageSummary from "@/assets/images/image_summary.png";

type Props = {
	content: StyledText;
};

export function SummarySection({ content }: Props) {
	return (
		<section className="w-full h-screen overflow-hidden relative flex flex-col justify-center items-center p-3">
			<Image
				placeholder="blur"
				src={imageSummary}
				alt="Graphical Background Image"
				className="w-full h-full object-cover absolute top-0 left-0 -z-50"
			/>
			<div className="flex-1 mt-24" />
			<RichText className="text-md md:text-2xl leading-relaxed">
				{content}
			</RichText>
			<div className="flex-1" />
			<IconLogo className="w-8 h-8 mb-24 fill-white" />
		</section>
	);
}
