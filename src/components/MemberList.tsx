import type { Member as MemberType } from "@/types/Member";
import classNames from "classnames";
import { Member } from "./Member";

type Props = {
  members?: MemberType[] | null;
  className?: string;
  memberClassName?: string;
};

export function MemberList({ members, className, memberClassName }: Props) {
  if (!members) {
    return null;
  }

  return (
    <div
      className={classNames(
        "w-full grid mx-auto align-items-center",
        className
      )}
      style={{
        gridTemplateColumns: `repeat(${members.length}, minmax(0, 1fr))`,
      }}
    >
      {members.map((member) => (
        <Member key={member.id} member={member} className={memberClassName} />
      ))}
    </div>
  );
}
