"use client";

import { useState } from "react";
import { Descendant, createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";

type Props = {
	children: Descendant[];
};

export function SlateText({ children }: Props) {
	const [editor] = useState(() => withReact(createEditor()));

	return (
		<Slate editor={editor} initialValue={children} onValueChange={() => {}}>
			<Editable readOnly disabled />
		</Slate>
	);
}
