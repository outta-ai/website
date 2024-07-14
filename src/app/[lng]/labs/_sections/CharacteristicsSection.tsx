import { RichText, type StyledText } from "@/components/RichText";
import type { WebsiteLab } from "@payload/types";

type Props = {
	characteristics: WebsiteLab["index"]["characteristics"];
};

export function CharacteristicsSection({ characteristics }: Props) {
	return (
		<div className="w-full bg-customgrad-gray overflow-auto">
			<div className="w-full max-w-[1024px] mx-auto px-6 lg:px-16 py-12">
				<h3 className="font-pretendard font-bold text-2xl">
					<span className="text-identity-400">OUTTA AI 부트캠프</span>의 특징
				</h3>
				<div className="flex flex-col sm:flex-row gap-6 overflow-x-auto mt-6 py-3">
					{characteristics?.map((c) => {
						return (
							<div
								key={c.id}
								className="w-full flex flex-col shrink-0 max-w-[480px] min-h-[192px] rounded-xl"
							>
								<p className="bg-customgrad-main rounded-t-xl text-white px-7 py-3 text-center text-xl font-semibold">
									{c.title}
								</p>
								<RichText className="bg-[#47484D] rounded-b-xl text-white flex-1 px-7 py-6 flex items-center font-light">
									{c.description as StyledText}
								</RichText>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
