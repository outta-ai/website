import type { Member as MemberType } from "@/types/Member";
import classNames from "classnames";
import Image from "next/image";

type Props = {
	member: MemberType;
	className?: string;
};

export function Member({ member, className }: Props) {
	const image = (() => {
		if (typeof member.member === "string") {
			return null;
		}

		if (typeof member.member.profile === "string") {
			return null;
		}

		if (!member.member.profile) {
			return null;
		}

		return member.member.profile?.url;
	})();

	const name = (() => {
		if (typeof member.member === "string") {
			return "익명의 멤버";
		}

		return member.member.name;
	})();

	const description = member.description || [];

	return (
		<div
			className={classNames(
				"w-full mt-12 sm:mt-0 flex px-12 lg:px-0 flex-col sm:flex-row lg:flex-col",
				className,
			)}
		>
			<div className="w-full sm:w-64 lg:w-none">
				{image ? (
					<Image
						src={image}
						width="1024"
						height="1024"
						alt={`Profile Image of ${name}`}
						className="w-full max-w-[150px] aspect-square rounded-full mx-auto"
					/>
				) : (
					<div className="w-full aspect-square max-w-[150px] bg-gray-200 rounded-full mx-auto" />
				)}
				<p className="my-6 text-xl font-bold text-center">
					{member.position} | {name}
				</p>
			</div>
			<ul className="ml-0 sm:ml-12 lg:ml-0 w-full list-disc list-outside">
				{description.map((desc, i) => (
					<li key={`${name}-${desc.description}`} className="text-gray-500">
						{desc.description}
					</li>
				))}
			</ul>
		</div>
	);
}
