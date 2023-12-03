import Image from "next/image";

import { Rufina } from "next/font/google";

import blueShapeImage from "../assets/image_blue_abstract.svg";
import mainTextImage from "../assets/image_main_text.svg";

const fontRufina = Rufina({ weight: "400", subsets: ["latin", "latin-ext"] });

export default function Home() {
  return (
    <main className="container mx-auto">
      <section>
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="flex w-full justify-center items-center">
            <Image
              alt="Main Page Abstract Image"
              src={blueShapeImage}
              quality={100}
            />
          </div>
          <div className="flex w-full justify-center items-center transform -translate-y-6">
            <Image alt="Main Page Text" src={mainTextImage} quality={100} />
          </div>
          <div className="absolute top-2/5 right-32 transform -translate-y-1/2">
            <p className="font-pretendard font-base">Everyone can,</p>
            <p className="font-pretendard font-base">Everyone must</p>
            <p className="font-pretendard font-base">Make a difference.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
