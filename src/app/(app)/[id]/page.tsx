"use client";

import { Editor } from "@/components/Views/Editor";
import { MarkdownViewer } from "@/components/Views/MarkdownViewer";
import React, { useState } from "react";
import "./styles.css";
import { Toolbar } from "@/components/Toolbar";

type Props = {};

const SheetId = ({}: Props) => {
	const [markdown, setMarkdown] = useState<string>(``);

	const handleChange = (e: string) => {
		setMarkdown(e);
	};

	return (
		<main className="pt-16">
			<Toolbar />
			<div className="grid grid-cols-2 grid-rows-1 m-0 p-0 divide-x-2 h-[calc(100vh-(80px+56px))]">
				<Editor setMarkdown={setMarkdown} markdown={markdown} />
				<MarkdownViewer lineNumbers={true} content={markdown} />
			</div>
		</main>
	);
};

export default SheetId;
