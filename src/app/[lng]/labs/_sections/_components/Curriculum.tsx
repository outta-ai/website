import { getImage } from "@/utils/image";
import type { WebsiteLab } from "@payload/types";
import Image from "next/image";

type Props = {
	curriculum: Exclude<WebsiteLab["index"]["curriculums"], null | undefined>[0];
};

export function Curriculum({ curriculum }: Props) {
	const courses = curriculum.courses ?? [];

	return (
		<div className="flex-1 flex flex-col bg-[#F8F8F8] rounded-2xl p-6 sm:p-12">
			<Image
				src={getImage(curriculum.icon)}
				alt="icon"
				width={64}
				height={64}
			/>
			<h4 className="mt-8 text-identity-400 text-2xl font-bold">
				{curriculum.name}
			</h4>
			<p className="mt-6 text-base">{curriculum.description}</p>
			<div className="flex-1 flex flex-col gap-12 mt-8 rounded-lg bg-white px-6 py-8">
				{courses.map((course) => (
					<div key={course.id}>
						<p className="text-xl font-semibold">{course.name}</p>
						<p className="mt-4">{course.description}</p>
					</div>
				))}
			</div>
		</div>
	);
}
