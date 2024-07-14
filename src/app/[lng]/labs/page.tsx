import type { WebsiteLab } from "@payload/types";

import { CharacteristicsSection } from "./_sections/CharacteristicsSection";
import { CurriculumSection } from "./_sections/CurriculumSection";
import { RecommendSection } from "./_sections/RecommendSection";
import { ReviewSection } from "./_sections/ReviewSection";

import IconPopupPolygon from "@/assets/icons/icon_popup_polygon.svg";
import IconQuestion from "@/assets/icons/icon_question.svg";
import IconWrite from "@/assets/icons/icon_write.svg";

export default async function LabsPage() {
	const request = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/globals/website-lab`,
		{
			next: {
				revalidate: 5 * 60,
				tags: ["payload"],
			},
		},
	);

	const dataRaw = await request.json();
	const data = (dataRaw as WebsiteLab).index;

	const left =
		new Date(data.registration.due_date).getTime() - new Date().getTime();

	return (
		<div>
			<CharacteristicsSection characteristics={data.characteristics} />
			<CurriculumSection curriculums={data.curriculums} />
			<ReviewSection reviews={data.reviews} />
			<RecommendSection recommend={data.recommend} />
			<div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-16 pb-24 relative">
				{new Date(data.registration.due_date) > new Date() ? (
					<>
						<div className="absolute animate-bounce top-0 flex flex-col items-center mr-0 sm:mr-64">
							<p className="bg-[#D9D9D9] text-identity-800 font-bold px-4 py-2 rounded-full">
								3회 부트캠프 신청{" "}
								<span className="text-identity-400">
									{Math.floor(left / 1000 / 60 / 60 / 24)}일 후 마감!
								</span>
							</p>
							<IconPopupPolygon className="w-12 h-12 -mt-0.5" />
						</div>
						<a
							href={data.registration.link}
							className="px-8 py-4 rounded-xl bg-customgrad-main text-white font-sbaggro"
						>
							부트캠프 참가신청
							<IconWrite className="inline w-6 h-6 ml-2" />
						</a>
					</>
				) : (
					<p className="px-8 py-4 rounded-xl bg-customgrad-gray text-black font-sbaggro">
						마감되었습니다
					</p>
				)}
				<a
					href="/labs/board?category=faq"
					className="px-8 py-4 rounded-xl bg-black text-white font-sbaggro"
				>
					자주 묻는 질문
					<IconQuestion className="inline w-6 h-6 ml-2" />
				</a>
			</div>
		</div>
	);
}
