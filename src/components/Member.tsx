import { Media } from "@/../payload-types";
import type { Member as MemberType } from "@/types/Member";
import classNames from "classnames";
import Image from "next/image";

type Props = {
  member: MemberType;
  className?: string;
};

export async function Member({ member, className }: Props) {
  const name = (() => {
    if (typeof member.member === "string") {
      return "익명의 멤버";
    }

    return member.member.name;
  })();

  const image = await (async () => {
    if (typeof member.member === "string") {
      return null;
    }

    if (!member.member.profile) {
      return null;
    }

    if (typeof member.member.profile !== "string") {
      return `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL}${member.member.profile.url}`;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL}/api/media/${typeof member
        .member.profile}`
    );
    const dataRaw = await response.json();
    const data = dataRaw as Media;

    return `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL}${data.url}`;
  })();

  const description = member.description || [];

  return (
    <div className={classNames("w-full", className)}>
      {image ? (
        <Image
          src={image}
          width="1024"
          height="1024"
          alt={`Profile Image of ${name}`}
          className="w-full max-w-[150px] aspect-square rounded-full mx-auto"
        />
      ) : (
        <div className="w-full aspect-square bg-gray-400 rounded-full" />
      )}
      <p className="my-6 text-xl font-bold text-center">
        {member.position} | {name}
      </p>
      <ul className="w-full list-disc list-inside">
        {description.map((desc, i) => (
          <li key={`${name}-${desc.description}`} className="text-gray-500">
            {desc.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
