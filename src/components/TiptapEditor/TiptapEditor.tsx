import ExtensionImage from "@tiptap/extension-image";
import {
	EditorContent,
	useEditor,
	type Content,
	type Editor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
	AttachmentUploadResult,
	ExtensionImagePasteDrop,
} from "./extensions/image";

import classNames from "classnames";

import {
	faBold,
	faCode,
	faFileCode,
	faImage,
	faItalic,
	faListOl,
	faListUl,
	faStrikethrough,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, useImperativeHandle, useRef } from "react";

export const extensions = (readOnly?: boolean) => {
	if (!readOnly) {
		return [
			StarterKit,
			ExtensionImage.configure({
				HTMLAttributes: { class: "not-prose" },
			}),
		];
	}

	return [
		StarterKit.configure({
			history: false,
			dropcursor: false,
			gapcursor: false,
		}),
		ExtensionImagePasteDrop,
	];
};

type ToolbarProps = {
	editor: Editor | null;
};

function TiptapToolbar({ editor }: ToolbarProps) {
	const imageInputRef = useRef<HTMLInputElement>(null);

	return (
		<div className="flex border-b">
			<button
				type="button"
				className={classNames(
					"p-4",
					editor?.isActive("bold") ? "bg-zinc-300" : "",
				)}
				onClick={() => editor?.chain().focus().toggleBold().run()}
			>
				<FontAwesomeIcon icon={faBold} className="w-4 h-4" />
			</button>
			<button
				type="button"
				className={classNames(
					"p-4",
					editor?.isActive("italic") ? "bg-zinc-300" : "",
				)}
				onClick={() => editor?.chain().focus().toggleItalic().run()}
			>
				<FontAwesomeIcon icon={faItalic} className="w-4 h-4" />
			</button>
			<button
				type="button"
				className={classNames(
					"p-4",
					editor?.isActive("strike") ? "bg-zinc-300" : "",
				)}
				onClick={() => editor?.chain().focus().toggleStrike().run()}
			>
				<FontAwesomeIcon icon={faStrikethrough} className="w-4 h-4" />
			</button>
			<button
				type="button"
				className={classNames(
					"p-4",
					editor?.isActive("code") ? "bg-zinc-300" : "",
				)}
				onClick={() => editor?.chain().focus().toggleCode().run()}
			>
				<FontAwesomeIcon icon={faCode} className="w-4 h-4" />
			</button>
			<button
				type="button"
				className={classNames(
					"p-4",
					editor?.isActive("codeblock") ? "bg-zinc-300" : "",
				)}
				onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
			>
				<FontAwesomeIcon icon={faFileCode} className="w-4 h-4" />
			</button>
			<button
				type="button"
				className={classNames(
					"p-4",
					editor?.isActive("bulletList") ? "bg-zinc-300" : "",
				)}
				onClick={() => editor?.chain().focus().toggleBulletList().run()}
			>
				<FontAwesomeIcon icon={faListUl} className="w-4 h-4" />
			</button>
			<button
				type="button"
				className={classNames(
					"p-4",
					editor?.isActive("orderedList") ? "bg-zinc-300" : "",
				)}
				onClick={() => editor?.chain().focus().toggleOrderedList().run()}
			>
				<FontAwesomeIcon icon={faListOl} className="w-4 h-4" />
			</button>
			<button
				type="button"
				className={classNames(
					"p-4",
					editor?.isActive("orderedList") ? "bg-zinc-300" : "",
				)}
				onClick={() => imageInputRef.current?.click()}
			>
				<FontAwesomeIcon icon={faImage} className="w-4 h-4" />
			</button>
			<input
				type="file"
				accept="image/*"
				ref={imageInputRef}
				className="hidden"
				onChange={async (e) => {
					const file = e.target.files?.item(0);
					if (!file) return;
					const formData = new FormData();
					formData.append("file", file);
					formData.append("name", crypto.randomUUID());
					const response = await fetch(
						`${process.env.NEXT_PUBLIC_API_URL}/api/attachments`,
						{
							method: "POST",
							body: formData,
							credentials: "include",
						},
					);
					if (!response.ok) return;
					const textData = await response.text();

					const attachement = (() => {
						try {
							return JSON.parse(textData);
						} catch {
							return undefined;
						}
					})();

					const zodResult = AttachmentUploadResult.safeParse(attachement);
					if (!zodResult.success) {
						console.error(zodResult.error);
						return;
					}

					editor
						?.chain()
						.focus()
						.setImage({ src: zodResult.data.doc.url })
						.run();
				}}
			/>
		</div>
	);
}

type Props = {
	content?: Content;
	readOnly?: boolean;
	className?: string;
	editorClass?: string;
};

export const TiptapEditor = forwardRef(
	({ content, readOnly, className, editorClass }: Props, ref) => {
		const editor = useEditor({
			extensions: extensions(readOnly),
			content,
			editorProps: {
				attributes: {
					class: classNames(
						"max-w-full prose prose-sm sm:prose-base font-pretendard focus:outline-none py-4",
						editorClass,
						readOnly ? "" : "px-4",
					),
				},
			},
			editable: !readOnly,
		});

		useImperativeHandle(ref, () => ({ editor }));

		return (
			<div className={className}>
				{!readOnly && <TiptapToolbar editor={editor} />}
				<EditorContent editor={editor} readOnly={readOnly} />
			</div>
		);
	},
);
