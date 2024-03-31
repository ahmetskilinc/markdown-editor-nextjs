"use client";

import React, { useState, useRef, useEffect } from "react";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import FormatBoldRoundedIcon from "@mui/icons-material/FormatBoldRounded";
import FormatItalicRoundedIcon from "@mui/icons-material/FormatItalicRounded";
import StrikethroughSRoundedIcon from "@mui/icons-material/StrikethroughSRounded";
import FormatSizeRoundedIcon from "@mui/icons-material/FormatSizeRounded";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { getSheetFromDb } from "../../utils/db";

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
		const id = window.location.pathname.split("/")[2];
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
		return sel?.toString();
	}

	return hidden ? (
		<Button size="small" className="open-button" onClick={() => handleToggleEditor()}>
			<ArrowBackIosRoundedIcon />
		</Button>
	) : (
		<div className="textarea-container">
			<Toolbar variant="dense">
				<IconButton size="small" onClick={() => insertMyText("bold")}>
					<FormatBoldRoundedIcon />
				</IconButton>
				<IconButton size="small" onClick={() => insertMyText("italic")}>
					<FormatItalicRoundedIcon />
				</IconButton>
				<IconButton size="small" onClick={() => insertMyText("strikethrough")}>
					<StrikethroughSRoundedIcon />
				</IconButton>
				<Divider orientation="vertical" flexItem />
				<IconButton size="small" onClick={() => insertMyText("checkbox")}>
					<CheckBoxIcon />
				</IconButton>
				<Divider orientation="vertical" flexItem />
				<IconButton size="small" disabled>
					<FormatSizeRoundedIcon />
				</IconButton>
				<IconButton size="small" disabled>
					<FormatListBulletedRoundedIcon />
				</IconButton>
				<IconButton size="small" disabled>
					<FormatListNumberedRoundedIcon />
				</IconButton>
				<Divider orientation="vertical" flexItem />
				<span></span>
				<IconButton size="small" onClick={() => handleToggleEditor()}>
					<ArrowForwardIosRoundedIcon />
				</IconButton>
			</Toolbar>
			<textarea
				ref={textArea}
				className="text-area"
				placeholder="Start here..."
				onChange={(e) => setMarkdown(e.target.value)}
				value={markdown}
			/>
		</div>
	);
};
