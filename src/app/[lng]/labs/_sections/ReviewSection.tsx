import { WebsiteLab } from "@payload/types";
import { ReviewMessage } from "./_components/ReviewMessage";

type Props = {
	reviews: WebsiteLab["index"]["reviews"];
};

export function ReviewSection({ reviews }: Props) {
	return (
		<div className="w-full max-w-[1024px] mx-auto px-6 lg:px-16 py-12">
			<h3 className="font-pretendard font-bold text-2xl">수강후기</h3>
			<div className="grid grid-cols-1 sm:grid-cols-2 mt-6 gap-3">
				{reviews?.map((review, index) => (
					<ReviewMessage
						key={review.id}
						review={review}
						polygonLocation={index % 4 < 2 ? "right" : "left"}
						polygonDirection={index % 2 === 0 ? "left" : "right"}
						className={
							index % 2 === 0
								? "[&>div]:bg-identity-100 [&>svg]:fill-identity-100 mb-0 sm:mb-24"
								: "[&>div]:bg-zinc-100 [&>svg]:fill-zinc-100"
						}
					/>
				))}
			</div>
		</div>
	);
}
