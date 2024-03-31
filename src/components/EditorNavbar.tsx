import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

// { markdownToParse }
export const EditorNavbar = () => {
	return (
		<AppBar position="static" elevation={0}>
			<Toolbar>
				<Link
					href="/"
					style={{
						flexGrow: 1,
						color: "#ffffff",
						textDecoration: "none",
					}}
				>
					<Typography variant="h6">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src="/logo.png" height={15} alt="markdown logo" />
						Editor
					</Typography>
				</Link>
				{/* <SaveMdSheet markdownToSave={markdownToParse} />
				<ShowRawHtml markdownToParse={markdownToParse} />
				<CheatSheet /> */}
			</Toolbar>
		</AppBar>
	);
};
