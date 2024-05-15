import Image from "next/image";

import { RichText, StyledText } from "@/components/RichText";

import imageComputer from "@/assets/images/image_computer.png";

type Props = {
  title: string;
  description: StyledText;
};

export function HowSection({ title, description }: Props) {
  return (
    <>
      <section className="block lg:hidden w-full min-h-screen overflow-auto">
        <div className="py-16 sm:py-32 px-3 lg:mx-48 flex">
          <div className="flex flex-col shrink-0">
            <h2 className="font-sbaggro font-light uppercase text-sm">
              &lt;How We Do&gt;
            </h2>
            <div className="flex-1" />
          </div>
          <div className="flex flex-col w-full">
            <Image
              alt="Laptop"
              src={imageComputer}
              className="-z-50 w-64 sm:w-auto"
            />
            <div className="flex-1" />
          </div>
        </div>
        <div className="w-full px-3">
          <p className="text-4xl font-bold mb-12">{title}</p>
          <RichText className="mb-12 text-lg">{description}</RichText>
          <h2 className="font-sbaggro font-light uppercase text-sm text-right pb-12">
            &lt;/How We Do&gt;
          </h2>
        </div>
      </section>
      <section className="hidden lg:flex flex-col w-full min-h-screen overflow-auto">
        <div className="pt-16 sm:pt-32 px-3 lg:px-48 grid grid-cols-6 flex-1">
          <div className="flex flex-col shrink-0 col-span-3">
            <h2 className="font-sbaggro font-light uppercase text-sm">
              &lt;How We Do&gt;
            </h2>
            <div className="flex-1" />
            <p className="text-4xl font-bold mb-6">{title}</p>
          </div>
          <div />
          <div className="flex flex-col w-full col-span-2">
            <Image
              alt="Laptop"
              src={imageComputer}
              className="-z-50 w-64 sm:w-auto"
            />
            <div className="flex-1" />
          </div>
        </div>
        <div className="w-full px-3 lg:px-48">
          <RichText className="mb-12 text-lg">{description}</RichText>
          <h2 className="font-sbaggro font-light uppercase text-sm text-right pb-12">
            &lt;/How We Do&gt;
          </h2>
        </div>
      </section>
    </>
  );
}
