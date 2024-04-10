import { unsafeHash } from "@/utils/hash";

export type StyledWord = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
};

export type StyledLine = {
  children: StyledWord[];
};

export type StyledText = StyledLine[];

function RichWord({ children }: StyledLine) {
  return (
    <p className="whitespace-pre-wrap">
      {children.map((word, index) => {
        const styles: string[] = [];

        if (word.bold) {
          styles.push("font-bold");
        }

        if (word.italic) {
          styles.push("font-italic");
        }

        if (word.underline) {
          styles.push("font-underline");
        }

        if (word.strikethrough) {
          styles.push("font-strikethrough");
        }

        if (word.code) {
          styles.push("font-monospace");
        }

        const key = `${word.text}_${index}`;
        return (
          <span key={key} className={styles.join(" ")}>
            {word.text || " "}
          </span>
        );
      })}
    </p>
  );
}

type Props = {
  className?: string;
  children?: StyledText;
};

export function RichText({ className, children }: Props) {
  if (!children) {
    return null;
  }

  const content = children
    .flatMap((line) => line.children.map((word) => word.text))
    .join(" ");
  const hash = unsafeHash(content);
  const start = content.substring(0, 4);

  return (
    <div className={className}>
      {children.map((line, index) => {
        const key = `${hash}_${start}_${index}`;
        return <RichWord key={key}>{line.children}</RichWord>;
      })}
    </div>
  );
}
