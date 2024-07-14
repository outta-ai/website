import type { WebsiteLab } from "@payload/types";

import IconMessagePolygon from "@/assets/icons/icon_message_polygon.svg";
import { RichText, type StyledText } from "@/components/RichText";
import classNames from "classnames";

type Props = {
	review: Exclude<WebsiteLab["index"]["reviews"], null | undefined>[0];
	polygonLocation: "left" | "right";
	polygonDirection: "left" | "right";
	className?: string;
};

export function ReviewMessage({
	review,
	polygonLocation,
	polygonDirection,
	className,
}: Props) {
	return (
		<div className="flex items-end">
			<div className={classNames("relative pb-8", className)}>
				<div className="rounded-2xl p-6">
					<p className="font-semibold">{review.name}</p>
					<RichText className="mt-3">
						{review.description as StyledText}
					</RichText>
				</div>
				<IconMessagePolygon
					className={classNames(
						"absolute bottom-[2px] right-8",
						polygonLocation === "left" ? "left-8" : "right-8",
						polygonDirection === "left" ? "transform scale-x-[-1]" : "",
					)}
				/>
			</div>
		</div>
	);
}
