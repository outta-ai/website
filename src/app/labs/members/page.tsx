import { WebsiteLab } from "@payload/types";
import classNames from "classnames";
import { MemberCard } from "./_components/MemberCard";

type Props = {
	searchParams?: {
		generation?: string;
	};
};

export default async function LabsMembersPage({ searchParams }: Props) {
	const request = await fetch(
		`${process.env.PAYLOAD_CMS_URL}/api/globals/website-lab`,
		{
			next: {
				revalidate: 5 * 60,
				tags: ["payload"],
			},
		},
	);

	const dataRaw = await request.json();
	const data = (dataRaw as WebsiteLab).members;

	if (!data) {
		return null;
	}

	const generation = (() => {
		if (
			searchParams?.generation &&
			!Number.isNaN(Number.parseFloat(searchParams?.generation))
		) {
			const generation = Number.parseFloat(searchParams?.generation);
			if (!Number.isNaN(generation)) {
				return generation.toString();
			}
		}

		if (!data.generations || data.generations.length === 0) {
			return "";
		}

		return Math.max(...data.generations.map((gen) => gen.index)).toString();
	})();

	const members = data.members?.filter(
		(m) => m.generation.toString() === generation,
	);

	return (
		<div className="w-full h-full max-w-[1024px] mx-auto lg:px-16 flex flex-col sm:flex-row">
			<ul className="w-64 h-full px-3">
				{data.generations
					?.sort((a, b) => b.index - a.index)
					.map((gen) => (
						<li
							key={`labs-member-generation-${gen.id}`}
							className={classNames(
								"mb-6 text-2xl font-bold",
								generation === gen.index.toString()
									? "text-identity-400"
									: "text-[#E4E4E4]",
							)}
						>
							<a
								href={`/labs/members?generation=${gen.index}`}
								className="tabular-nums"
							>
								{gen.index}기{" "}
								<span className="text-sm">
									{new Date(gen.start).getFullYear()}-
									{(new Date(gen.start).getMonth() + 1)
										.toString()
										.padStart(2, "0")}
								</span>{" "}
								~{" "}
								{gen.end ? (
									<span className="text-sm">
										{new Date(gen.end).getFullYear()}-
										{(new Date(gen.end).getMonth() + 1)
											.toString()
											.padStart(2, "0")}
									</span>
								) : (
									"현재"
								)}
							</a>
						</li>
					))}
			</ul>
			<div className="flex-1 h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 px-3 mb-12">
				{members?.map((member) => (
					<MemberCard member={member} key={member.id} />
				))}
			</div>
		</div>
	);
}
