"use client";

import React, { useState, useRef, useEffect } from "react";
import { createClient } from "@/app/utils/client";

export const Editor = ({
	markdown,
	handleChange,
}: {
	markdown: string;
	handleChange: (e: string) => void;
}) => {
	const supabase = createClient();
	const [hidden, setHidden] = useState(false);
	const textArea = useRef<HTMLTextAreaElement>(null);

	// const handleToggleEditor = () => {
	// 	if (!hidden) setMarkdown(`${textArea.current?.value}`);
	// 	setHidden(!hidden);
	// };

	const getTextToInsert = (
		type: "bold" | "italic" | "strikethrough" | "checkbox",
		text: string
	) => {
		switch (type) {
			case "italic":
				return `*${text}*`;
			case "bold":
				return `**${text}**`;
			case "strikethrough":
				return `~~${text}~~`;
			case "checkbox":
				return `- [ ] ${text}`;
		}
	};

	const insertMyText = (type: "bold" | "italic" | "strikethrough" | "checkbox") => {
		const start = textArea.current?.selectionStart;
		const finish = textArea.current?.selectionEnd;
		var newValue;
		let textBeforeCursorPosition = textArea.current?.value.substring(0, start);
		let textAfterCursorPosition = textArea.current?.value.substring(
			finish!,
			textArea.current.value.length
		);
		newValue = `${textBeforeCursorPosition}${getTextToInsert(
			type,
			getSelText(start, finish)!
		)}${textAfterCursorPosition}`;
		// setMarkdown(newValue);
	};

	function getSelText(start?: number, finish?: number) {
		var sel = textArea.current?.value.substring(start!, finish!);
		return sel;
	}
	return (
		<div className="h-full m-0 p-0">
			<textarea
				ref={textArea}
				className="p-6 m-0 h-full w-full outline-none border-none ring-none shadow-none focus:outline-none focus:border-none focus:ring-none focus:shadow-none resize-none overflow-x-scroll font-mono"
				placeholder="Start here..."
				onChange={(e) => handleChange(e.target.value)}
				value={markdown || ""}
			/>
		</div>
	);
};
