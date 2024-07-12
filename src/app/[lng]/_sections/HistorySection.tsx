import type { WebsiteMain } from "@payload/types";

type Props = {
	contents: WebsiteMain["history"];
};

function YearList({ contents }: Props) {
	if (!contents) {
		return null;
	}

	const year = new Date(contents[0].year).getUTCFullYear();

	return (
		<div className="my-24">
			<p className="inline p-2 rounded-md bg-identity-100 text-identity-400">
				{year}
			</p>
			<div className="mt-6 hidden xl:grid xl:grid-cols-4 gap-x-12 gap-y-3 mx-auto text-lg">
				{contents
					.sort((a, b) => +new Date(a.year) - +new Date(b.year))
					.map((content) => (
						<p key={`history-title-${content.title}`} className="font-bold">
							{content.title}
						</p>
					))}
				{Array.from(Array(4 - (contents.length % 4))).map((_, i) => {
					const key = `history-placeholder-${i}`;
					return <div key={key} />;
				})}
				{contents
					.sort((a, b) => +new Date(a.year) - +new Date(b.year))
					.map((content) => (
						<p
							key={`history-content-${content.title}`}
							className="text-gray-500 whitespace-pre-wrap"
						>
							{content.description}
						</p>
					))}
			</div>
			<div className="mt-6 xl:hidden gap-x-12 gap-y-3 mx-auto text-lg">
				{contents
					.sort((a, b) => +new Date(a.year) - +new Date(b.year))
					.map((content) => (
						<div key={`history-${content.title}`} className="mt-12">
							<p className="font-bold">{content.title}</p>
							<p className="text-gray-500 whitespace-pre-wrap">
								{content.description}
							</p>
						</div>
					))}
			</div>
		</div>
	);
}

export function HistorySecion({ contents }: Props) {
	if (!contents || contents.length === 0) {
		return null;
	}

	const historyMap = new Map<number, Required<WebsiteMain["history"]>>();
	for (const history of contents) {
		const data = new Date(history.year);
		const array = historyMap.get(data.getUTCFullYear()) || [];
		historyMap.set(data.getUTCFullYear(), [...array, history]);
	}

	return (
		<section id="history" className="w-full min-h-screen py-12 px-3 lg:px-48">
			<h2 className="text-4xl font-sbaggro my-16">History</h2>
			{[...historyMap.keys()].sort().map((year) => (
				<YearList key={`history-${year}`} contents={historyMap.get(year)} />
			))}
		</section>
	);
}
