"use client";

import React, { useState, useRef, useEffect } from "react";
import { getSheetFromDb } from "../../utils/db";
import { Toolbar } from "../";

export const Editor = ({
	setMarkdown,
	markdown,
}: {
	setMarkdown: React.Dispatch<React.SetStateAction<string>>;
	markdown: string;
}) => {
	const [hidden, setHidden] = useState(false);
	const textArea = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		const id = window.location.pathname.split("/")[1];
		console.log(id);
		getSheetFromDb(id)
			.then((res) => {
				if (res.file.length > 0) {
					setMarkdown(res.file);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleToggleEditor = () => {
		if (!hidden) setMarkdown(`${textArea.current?.value}`);
		setHidden(!hidden);
	};

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
		setMarkdown(newValue);
	};

	function getSelText(start?: number, finish?: number) {
		var sel = textArea.current?.value.substring(start!, finish!);
		return sel;
	}
	return (
		<div className="h-full m-0 p-0">
			<textarea
				ref={textArea}
				className="p-6 m-0 h-full w-full outline-none"
				placeholder="Start here..."
				onChange={(e) => setMarkdown(e.target.value)}
				value={markdown}
			/>
		</div>
	);
};
