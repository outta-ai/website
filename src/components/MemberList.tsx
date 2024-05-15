"use client";

import type { Member as MemberType } from "@/types/Member";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Member } from "./Member";

type Props = {
	members?: MemberType[] | null;
	className?: string;
	memberClassName?: string;
};

export function MemberList({ members, className, memberClassName }: Props) {
	const [width, setWidth] = useState(0);

	useEffect(() => {
		const handleResize = () => {
			setWidth(window.innerWidth);
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	if (!members) {
		return null;
	}

	return (
		<div
			className={classNames(
				"w-full grid mx-auto align-items-center",
				className,
			)}
			style={{
				gridTemplateColumns: `repeat(${
					width > 1024 ? members.length : 1
				}, minmax(0, 1fr))`,
			}}
		>
			{members.map((member) => (
				<Member key={member.id} member={member} className={memberClassName} />
			))}
		</div>
	);
}
