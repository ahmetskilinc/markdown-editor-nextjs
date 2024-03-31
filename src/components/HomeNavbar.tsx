import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

export const HomeNavbar = () => {
	return (
		<AppBar position="static" elevation={0}>
			<Toolbar style={{ width: "80%", margin: "0 auto" }}>
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
				{/* <NewSheet /> */}
				{/* <OpenMdFile /> */}
			</Toolbar>
		</AppBar>
	);
};
