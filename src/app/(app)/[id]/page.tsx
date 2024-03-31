"use client";

import { Editor } from "@/components/views/Editor";
import { MarkdownViewer } from "@/components/views/MarkdownViewer";
import React, { useState } from "react";
import "./styles.css";

type Props = {};

const SheetId = ({}: Props) => {
	const [markdown, setMarkdown] = useState<string>(``);

	const handleChange = (e: string) => {
		setMarkdown(e);
	};

	return (
		<div className="container">
			<MarkdownViewer lineNumbers={true} content={markdown} />
			<Editor setMarkdown={setMarkdown} markdown={markdown} />
		</div>
	);
};

export default SheetId;
