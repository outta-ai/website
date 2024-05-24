import classNames from "classnames";
import { redirect } from "next/navigation";

type Props = {
	searchParams?: {
		category?: string;
	};
};

const categories = [
	{ key: "", name: "전체" },
	{ key: "notice", name: "공지" },
	{ key: "promotion", name: "홍보" },
	{ key: "faq", name: "FAQ" },
];

export default async function LabsBoardPage({ searchParams }: Props) {
	const category = searchParams?.category || "";

	if (!categories.map((c) => c.key).includes(category)) {
		redirect("/labs/board");
	}

	return (
		<div className="w-full max-w-[1024px] mx-auto lg:px-16 flex">
			<ul className="w-64">
				{categories.map((item) => (
					<li
						key={`labs-board-${item.key}`}
						className={classNames(
							"mb-6 text-2xl font-bold",
							category === item.key ? "text-identity-400" : "text-[#E4E4E4]",
						)}
					>
						<a href={`/labs/board?category=${item.key}`}>{item.name}</a>
					</li>
				))}
			</ul>
		</div>
	);
}
