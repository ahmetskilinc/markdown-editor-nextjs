import React from "react";
import gfm from "remark-gfm";
import ReactMarkdown, { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import {
	TableContainer,
	Table,
	TableHead,
	Paper,
	TableRow,
	TableCell,
	TableBody,
} from "@mui/material";

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
					style={materialDark}
					PreTag="div"
					showLineNumbers={lineNumbers}
					language={match[1]}
				>
					{String(children).replace(/\n$/, "")}
				</SyntaxHighlighter>
			) : (
				<code {...rest} className={className}>
					{children}
				</code>
			);
		},
		th: ({ children }) => <TableCell>{children}</TableCell>,
		tr: ({ children }) => <TableRow>{children}</TableRow>,
		thead: ({ children }) => <TableHead>{children}</TableHead>,
		tbody: ({ children }) => <TableBody>{children}</TableBody>,
		table: ({ children }) => (
			<TableContainer component={Paper}>
				<Table>{children}</Table>
			</TableContainer>
		),
	};

	return (
		<ReactMarkdown
			className={`markdown-container ${lineNumbers ? "" : "zero-padding"}`}
			rehypePlugins={[rehypeRaw]}
			remarkPlugins={[gfm]}
			components={components}
		>
			{content}
		</ReactMarkdown>
	);
};
