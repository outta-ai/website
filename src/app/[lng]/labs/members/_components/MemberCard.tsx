"use client";

import type { WebsiteLab } from "@payload/types";
import classNames from "classnames";
import Image from "next/image";

import {
	faChevronDown,
	faChevronUp,
	faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type Props = {
	member: Exclude<
		Exclude<WebsiteLab["members"], null | undefined>["members"],
		null | undefined
	>[0];
	className?: string;
};

export function MemberCard({ member, className }: Props) {
	const [open, setOpen] = useState(false);

	if (typeof member.member === "string" || !member.member) {
		return null;
	}

	const memberValue = member.member;

	const image = (() => {
		if (!memberValue.profile || typeof memberValue.profile === "string") {
			return null;
		}

		return memberValue.profile;
	})();

	return (
		<div>
			<div
				className={classNames(
					"w-full rounded-lg border border-gray-300 relative",
					className,
				)}
			>
				<div className="flex p-3">
					{image?.url ? (
						<Image
							src={image.url}
							alt={image.alt || `Image of ${memberValue.name}`}
							width={64}
							height={64}
							className="w-16 h-16 rounded-full"
						/>
					) : (
						<div className="w-16 h-16 rounded-full bg-zinc-200" />
					)}
					<div className="ml-4 flex flex-col justify-center">
						<div className="flex items-center">
							<p className="font-semibold">{memberValue.name}</p>
							{memberValue.email && (
								<a
									href={`mailto:${memberValue.email}`}
									className="ml-2 text-sm text-gray-500"
								>
									<FontAwesomeIcon icon={faEnvelope} />
								</a>
							)}
						</div>
						<p className="text-sm text-identity-300">{member.role}</p>
					</div>
				</div>
				<button
					type="button"
					className="w-full block my-3 text-sm text-center"
					onClick={() => setOpen(!open)}
				>
					<span>활동내용 </span>
					<FontAwesomeIcon
						icon={open ? faChevronUp : faChevronDown}
						className="w-3.5 h-3.5"
					/>
				</button>
				{open && (
					<ul className="z-50 w-full rounded-lg">
						{member.works?.map((w) => (
							<li
								key={w.id}
								className="text-sm border-gray-300 p-2 last:rounded-b-lg border-t"
							>
								{w.description}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
