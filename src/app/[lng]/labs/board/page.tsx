import { LabPost } from "@payload/types";
import classNames from "classnames";
import { redirect } from "next/navigation";
import { categories } from "./constants";
import { Langauges } from "@/lib/i18n";

type Props = {
	searchParams?: {
		category?: string;
		page?: string;
	};
};

export default async function LabsBoardPage({ searchParams }: Props) {
	const category = searchParams?.category || "";

	if (!categories.map((c) => c.key).includes(category)) {
		redirect("/labs/board");
	}

	const page = (() => {
		if (!searchParams?.page) {
			return 1;
		}

		const page = Number.parseInt(searchParams.page);
		if (Number.isNaN(page)) {
			return 1;
		}

		return page;
	})();

	const categoryFilter = (() => {
		if (category === "") {
			return "";
		}

		const value = categories.find((c) => c.key === category)?.name;
		return `&where[category][equals]=${value}`;
	})();

	const request = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/lab-posts?limit=10&page=${page}${categoryFilter}`,
		{
			next: {
				revalidate: 5 * 60,
				tags: ["payload"],
			},
		},
	);
	const dataRaw = await request.json();
	const data = dataRaw as { docs: LabPost[]; totalDocs: number };

	return (
		<div className="w-full max-w-[1024px] mx-auto lg:px-16 flex flex-col sm:flex-row">
			<ul className="w-full sm:w-32 flex flex-row sm:flex-col gap-6 mb-6 pl-3">
				{categories.map((item) => (
					<li
						key={`labs-board-${item.key}`}
						className={classNames(
							"text-2xl font-bold",
							category === item.key ? "text-identity-400" : "text-[#E4E4E4]",
						)}
					>
						<a href={`/labs/board?category=${item.key}`}>{item.name}</a>
					</li>
				))}
			</ul>
			<div className="flex-1 mb-12 mr-3">
				{data.docs.map((post) => (
					<a
						href={`/labs/board/${post.id}`}
						key={post.id}
						className="flex items-center rounded-lg px-4 py-3 border border-gray-300"
					>
						<span className="text-identity-300 w-24 text-center font-semibold">
							{post.category}
						</span>
						<span className="font-semibold">{post.title}</span>
						<div className="flex-1" />
						<span className="text-gray-400">
							{new Date(post.createdAt).toLocaleDateString("ko-KR")}
						</span>
					</a>
				))}
			</div>
		</div>
	);
}

export async function generateStaticParams() {
	return Langauges.map((lng) => ({ lng }));
}
