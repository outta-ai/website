import type { PropsWithChildren } from "react";

export default function ProjectLayout({ children }: PropsWithChildren) {
	return (
		<div className="w-full h-full mt-48 px-3 lg:px-48 flex justify-center items-center font-pretendard">
			{children}
		</div>
	);
}
