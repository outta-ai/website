import type { WebsiteMain } from "@payload/types";
import { Fragment } from "react";

type Props = {
	values: WebsiteMain["values"];
};

export function CoreValueSeciton({ values }: Props) {
	if (!values || values.length === 0) {
		return null;
	}

	return (
		<section id="core-value" className="w-full lg:h-[75vh] bg-black">
			<div className="h-full py-16 sm:py-32 px-3 lg:px-48">
				<h2 className="text-white text-3xl font-sbaggro mb-12">Core Value</h2>
				<div
					className="w-full h-full grid 2xl:hidden gap-6 items-center content-center justify-items-center"
					style={{
						gridTemplateColumns: `repeat(${values.length}, minmax(0, 1fr))`,
					}}
				>
					{values.map((value) => (
						<div
							key={`keyword-${value.id ?? value.keyword}`}
							className="w-full aspect-square max-w-40 rounded-full bg-white flex justify-center items-center p-3"
						>
							<p className="font-sbaggro text-[1.5cqw] uppercase">
								{value.keyword || " "}
							</p>
						</div>
					))}
					{values.map((value) => (
						<p
							key={`description-${value.id ?? value.keyword}`}
							className="w-full h-full text-white text-base lg:text-lg break-keep text-center"
						>
							{value.description}
						</p>
					))}
				</div>
				<div className="w-full h-full 2xl:grid grid-cols-[minmax(max-content,128px)_1fr] hidden gap-6 items-center content-center justify-items-center">
					{values.map((value) => (
						<Fragment key={`value-${value.id ?? value.keyword}`}>
							<div className="w-full aspect-square max-w-48 rounded-full bg-white flex justify-center items-center shrink-0 p-3">
								<p className="font-sbaggro text-[0.75cqw] uppercase">
									{value.keyword || " "}
								</p>
							</div>
							<p className="w-full text-white text-base lg:text-lg break-keep">
								{value.description}
							</p>
						</Fragment>
					))}
				</div>
			</div>
		</section>
	);
}
