import { RichText, StyledText } from "@/components/RichText";
import { LabPost } from "@payload/types";
import classNames from "classnames";
import { categories } from "../page";

type Props = {
	params: {
		id: string;
	};
};

export default async function LabsBoardPage({ params: { id } }: Props) {
	const request = await fetch(
		`${process.env.PAYLOAD_CMS_URL}/api/lab-posts/${id}`,
		{
			next: {
				revalidate: 5 * 60,
				tags: ["payload"],
			},
		},
	);
	const dataRaw = await request.json();
	const data = dataRaw as LabPost;

	return (
		<div className="w-full max-w-[1024px] mx-auto lg:px-16 flex">
			<ul className="w-32">
				{categories.map((item) => (
					<li
						key={`labs-board-${item.key}`}
						className={classNames(
							"mb-6 text-2xl font-bold",
							data.category === item.name
								? "text-identity-400"
								: "text-[#E4E4E4]",
						)}
					>
						<a href={`/labs/board?category=${item.key}`}>{item.name}</a>
					</li>
				))}
			</ul>
			<div className="flex-1">
				<div className="flex items-end">
					<h2 className="text-4xl font-bold">{data.title}</h2>
					<div className="flex-1" />
					<div className="text-sm text-gray-400">
						<p>
							최초 작성 일자: {new Date(data.createdAt).toLocaleString("ko-KR")}
						</p>
						<p>
							최종 수정 일자: {new Date(data.updatedAt).toLocaleString("ko-KR")}
						</p>
					</div>
				</div>
				<hr className="my-4" />
				<RichText className="leading-relaxed">
					{data.content as StyledText}
				</RichText>
			</div>
		</div>
	);
}
