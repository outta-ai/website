import type { WebsiteLab } from "@payload/types";
import { Curriculum } from "./_components/Curriculum";

type Props = {
	curriculums: WebsiteLab["index"]["curriculums"];
};

export function CurriculumSection({ curriculums }: Props) {
	return (
		<div className="w-full max-w-[1024px] mx-auto px-6 lg:px-16 py-12">
			<h3 className="font-pretendard font-bold text-2xl">커리큘럼</h3>
			<div className="flex flex-col sm:flex-row gap-3 mt-6">
				{curriculums?.map((c) => (
					<Curriculum key={c.id} curriculum={c} />
				))}
			</div>
		</div>
	);
}
