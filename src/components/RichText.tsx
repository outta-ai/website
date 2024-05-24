import { unsafeHash } from "@/utils/hash";

export type StyledWord =
	| {
			text: string;
			bold?: boolean;
			italic?: boolean;
			underline?: boolean;
			strikethrough?: boolean;
			code?: boolean;
	  }
	| {
			children: StyledWord[];
	  };

export type StyledLine = {
	children: StyledWord[] | StyledLine;
	type?:
		| "h1"
		| "h2"
		| "h3"
		| "h4"
		| "h5"
		| "h6"
		| "ul"
		| "ol"
		| "li"
		| "link"
		| "relationship"
		| "upload";
	className?: string;
	url?: string;
};

export type StyledText = StyledLine[];

function RichWord({ children, type, className, url }: StyledLine) {
	const lineStyles = ["whitespace-pre-wrap", className || ""];
	switch (type) {
		case "h1":
			lineStyles.push("text-4xl font-bold");
			break;
		case "h2":
			lineStyles.push("text-3xl font-bold");
			break;
		case "h3":
			lineStyles.push("text-2xl font-bold");
			break;
		case "h4":
			lineStyles.push("text-xl font-bold");
			break;
		case "h5":
			lineStyles.push("text-lg font-bold");
			break;
		case "h6":
			lineStyles.push("text-base font-bold");
			break;
	}

	if (type === "ul") {
		lineStyles.push("list-disc list-inside");
		return (
			<ul className={lineStyles.join(" ")}>
				{Array.isArray(children) ? (
					<RichWord>{children}</RichWord>
				) : (
					<RichWord>{children.children}</RichWord>
				)}
			</ul>
		);
	}

	if (type === "li") {
		lineStyles.push("list-decimal list-inside");
		return (
			<li className={lineStyles.join(" ")}>
				{Array.isArray(children) ? (
					<RichWord>{children}</RichWord>
				) : (
					<RichWord>{children.children}</RichWord>
				)}
			</li>
		);
	}

	if (type === "link") {
		return (
			<a href={url || ""} className="text-identity-600 underline">
				<RichWord className="block">{children}</RichWord>
			</a>
		);
	}

	if (!Array.isArray(children)) {
		return <RichWord>{children.children}</RichWord>;
	}

	return (
		<span className={lineStyles.join(" ")}>
			{children.map((word, index) => {
				if ("children" in word) {
					return <RichWord key={JSON.stringify(word.children)} {...word} />;
				}

				const styles: string[] = [];

				if (word.bold) {
					styles.push("font-bold");
				}

				if (word.italic) {
					styles.push("italic");
				}

				if (word.underline) {
					styles.push("underline");
				}

				if (word.strikethrough) {
					styles.push("line-through");
				}

				if (word.code) {
					styles.push("font-monospace");
				}

				const key = `${word.text}_${index}`;
				return (
					<span key={key} className={styles.join(" ")}>
						{word.text || ""}
					</span>
				);
			})}
		</span>
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

	const content = JSON.stringify(children);
	const hash = unsafeHash(JSON.stringify(content));
	const start = content.substring(0, 4);

	return (
		<div className={className}>
			{children.map((line, index) => {
				const key = `${hash}_${start}_${index}`;

				if (line.type === "relationship" || line.type === "upload") {
					return (
						<p key={key} className="block text-red-500">
							Unable to render block type of "{line.type}"
						</p>
					);
				}

				return (
					<RichWord key={key} type={line.type} className="block">
						{line.children}
					</RichWord>
				);
			})}
		</div>
	);
}
