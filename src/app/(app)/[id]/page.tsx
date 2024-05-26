"use client";

import { Editor } from "@/components/Views/Editor";
import { MarkdownViewer } from "@/components/Views/MarkdownViewer";
import React, { useEffect, useState } from "react";
import { Toolbar } from "@/components/Toolbar";
import { updateSupabaseField } from "@/app/functions/updateSheet";
import { createClient } from "@/app/utils/client";

const Page: React.FC<{ params: { id: string } }> = ({ params: { id } }) => {
	const [markdown, setMarkdown] = useState<string>(``);
	const [saved, setSaved] = useState<boolean>(true);
	const supabase = createClient();

	const handleInputChange = (e: string) => {
		setMarkdown(e);
		setSaved(false);
		// @ts-ignore
		// clearTimeout(updateTimeout);

		const updateTimeout = setTimeout(() => {
			updateSupabaseField(e, id);
			setSaved(true);
		}, 2000);
	};

	useEffect(() => {
		async function getSheets() {
			const data = await supabase.from("sheets").select("*").eq("id", id);

			setMarkdown(data?.data?.[0].content || "");
		}

		getSheets();
	}, [id]);

	return (
		<main className="pt-16">
			<Toolbar saved={saved} />
			<div className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 m-0 p-0 divide-y-2 divide-x-0 md:divide-y-0 md:divide-x-2 h-[calc(100vh-(80px+56px))]">
				<Editor markdown={markdown} handleChange={handleInputChange} />
				<MarkdownViewer lineNumbers={true} markdown={markdown} />
			</div>
		</main>
	);
};

export default Page;
