import { RichText, StyledText } from "@/components/RichText";
import { getImage } from "@/utils/image";
import { WebsiteLab } from "@payload/types";
import classNames from "classnames";
import Image from "next/image";

type Props = {
	recommend: WebsiteLab["index"]["recommend"];
};

export function RecommendSection({ recommend }: Props) {
	return (
		<div className="w-full overflow-auto">
			<div className="w-full max-w-[1024px] mx-auto px-6 lg:px-16 py-12">
				<h3 className="font-pretendard font-bold text-2xl">
					이런 분들에게 추천해요!
				</h3>
				<div className="flex flex-col sm:flex-row gap-6 overflow-x-auto mt-6 py-3">
					{recommend?.map((r) => {
						return (
							<div
								key={r.id}
								className="w-full relative max-w-[480px] min-h-[192px] rounded-xl bg-zinc-100"
							>
								{r.image && (
									<div className="h-[192px] rounded-xl overflow-hidden relative">
										<Image
											src={getImage(r.image)}
											alt={
												typeof r.image === "string"
													? r.image
													: r.image.alt ?? ""
											}
											width={480}
											height={192}
											className="h-[192px] rounded-xl object-top object-cover"
										/>
										<div className="absolute top-0 left-0 w-full h-full z-5 bg-gradient-image" />
									</div>
								)}
								<div
									className={classNames(
										"absolute bottom-0 left-0 p-3",
										r.image ? "text-white" : "text-black",
									)}
								>
									<RichText>{r.description as StyledText}</RichText>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
