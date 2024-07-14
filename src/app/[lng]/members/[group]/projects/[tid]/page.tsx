"use client";

import { useEffect, useMemo } from "react";

import { useProject } from "@/hooks/payload";
import { BoardBlock } from "./_blocks/BoardBlock";

type Props = {
	params: {
		group: string;
		tid: string;
	};
};

export default function ProjectPage({ params: { tid, group } }: Props) {
	const { isLoading, isError, data: project, error } = useProject(group, tid);

	useEffect(
		function rewriteTid() {
			if (!project?.link) return;

			if (!/^[0-9a-fA-F]{24}$/.test(tid)) return;

			const url = new URL(window.location.href);
			const language = url.pathname.split("/")[1];
			url.pathname = `/${language}/members/${group}/projects/${project.link}`;
			history.replaceState(null, "", url);
		},
		[project, tid, group],
	);

	const baseUrl = useMemo(() => {
		if (typeof window === "undefined") return "en";

		const url = new URL(window.location.href);
		return url.pathname;
	}, []);

	if (isLoading) {
		return <p className="text-3xl text-gray-300">프로젝트 로딩중...</p>;
	}
	if (isError || !project) {
		try {
			const message = JSON.parse(error?.message || "{}");
			console.error(message);
		} catch {
			console.error(error);
		}
		return <p className="text-3xl">프로젝트를 로딩하는 데 실패하였습니다</p>;
	}

	return (
		<div className="w-full break-keep pb-64 p-3">
			<h2 className="font-semibold text-3xl text-center mb-6">
				{project.name}
			</h2>
			{!project.description && (
				<div className="w-full flex justify-center mb-6">
					<p className="w-full max-w-md text-center whitespace-pre-wrap">
						{project.description}
					</p>
				</div>
			)}
			{project.blocks?.map((block) => {
				if (block.blockType === "board") {
					return (
						<BoardBlock
							key={block.id}
							block={block}
							baseUrl={baseUrl}
							tid={tid}
							group={group}
						/>
					);
				}
				return null;
			})}
		</div>
	);
}
