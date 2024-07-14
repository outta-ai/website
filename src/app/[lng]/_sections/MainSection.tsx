import { Montserrat, Rufina } from "next/font/google";
import Image from "next/image";

import classNames from "classnames";

import IconMouse from "@/assets/icons/icon_mouse.svg";
import imageBlueAbstract from "@/assets/images/image_cover.png";

const fontRufina = Rufina({ weight: "400", subsets: ["latin", "latin-ext"] });
const fontMonsterrat = Montserrat({ weight: "400", subsets: ["latin"] });

export function MainSection() {
	return (
		<section className="w-full h-dvh relative">
			<div className="w-full h-5/6 absolute -z-50 top-0 left-0">
				<Image
					src={imageBlueAbstract}
					alt="Blue Abstract"
					className="w-full h-full lg:h-full max-w-[768px] object-contain mx-auto"
				/>
			</div>
			<div className="absolute bottom-0 flex flex-col justify-center w-full">
				<p className="flex flex-col sm:flex-row justify-center items-center uppercase font-sbaggro text-black text-center text-[min(8vw,96px)] leading-none">
					Make&nbsp;
					<span
						className={classNames(
							fontRufina.className,
							"text-[1.2em] inline-block pb-[min(0.8vw,10px)]",
						)}
					>
						a
					</span>
					&nbsp;difference
				</p>
				<div className="w-full flex flex-col items-center pb-6 text-sm lg:text-base">
					<p className={classNames(fontMonsterrat.className, "py-3")}>
						Discover more
					</p>
					<IconMouse className="w-5" />
				</div>
			</div>
		</section>
	);
}
