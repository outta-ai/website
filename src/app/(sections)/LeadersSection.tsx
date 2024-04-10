import { MemberList } from "@/components/MemberList";
import type { Member as MemberType } from "@/types/Member";

type Props = {
  boardMembers?: MemberType[] | null;
  executiveMembers?: MemberType[] | null;
};

export function LeadersSection({ boardMembers, executiveMembers }: Props) {
  return (
    <section className="w-full min-h-screen py-12 px-3 lg:px-48">
      <h2 className="text-4xl text-center font-sbaggro my-16">Leaders</h2>
      <MemberList
        members={boardMembers}
        className="mx-auto justify-items-center"
        memberClassName="max-w-64"
      />
      <MemberList
        members={executiveMembers}
        className="mt-24 mx-auto justify-items-center"
        memberClassName="max-w-64"
      />
    </section>
  );
}
