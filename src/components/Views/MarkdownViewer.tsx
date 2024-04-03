import React from "react";
import gfm from "remark-gfm";
import ReactMarkdown, { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";

export const MarkdownViewer = ({
	content,
	lineNumbers,
}: {
	content: string;
	lineNumbers: boolean;
}) => {
	const components: Partial<Components> = {
		code: (props: any) => {
			const { children, className, node, ...rest } = props;
			const match = /language-(\w+)/.exec(className || "");
			return match ? (
				<SyntaxHighlighter
					style={materialLight}
					showLineNumbers={lineNumbers}
					language={match[1]}
					codeTagProps={
						{
							// className: "not-prose",
						}
					}
				>
					{children ? String(children).replace(/\n$/, "") : ""}
				</SyntaxHighlighter>
			) : (
				<code {...rest} className={className}>
					{children}
				</code>
			);
		},
		th: ({ children }) => (
			<th
				scope="col"
				className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
			>
				{children}
			</th>
		),
		tbody: ({ children }) => <tbody className="divide-y divide-gray-200">{children}</tbody>,
		table: ({ children }) => (
			<table className="min-w-full divide-y divide-gray-300">{children}</table>
		),
	};

	return (
		<ReactMarkdown
			className={`h-full overflow-scroll m-0 p-6 prose max-w-full prose-pre:bg-transparent prose-pre:not-prose prose-pre:p-0`}
			rehypePlugins={[rehypeRaw]}
			remarkPlugins={[gfm]}
			components={components}
		>
			{content}
		</ReactMarkdown>
	);
};
