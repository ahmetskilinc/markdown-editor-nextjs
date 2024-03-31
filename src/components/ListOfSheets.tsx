"use client";

import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Dropzone from "./Dropzone";
import Link from "next/link";
import { getSheetsFromDb } from "@/utils/db";

type Sheet = {
	id: string;
	dateAdded: string;
	file: ArrayBuffer;
	name: string;
};

export const ListOfSheets = () => {
	const [sheets, setSheets] = useState<Sheet[] | null>(null);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		getSheetsFromDb().then((sheets) => {
			setSheets(sheets);
			setLoaded(true);
		});
	}, []);

	return (
		<div style={{ width: "80%", margin: "0 auto" }}>
			<Dropzone />
			<div>
				<Typography variant="h6">Your sheets</Typography>
			</div>
			<div>
				{loaded ? (
					sheets &&
					(sheets.length > 0 ? (
						sheets.map((sheet) => {
							return (
								<React.Fragment key={sheet.id}>
									<Link href={`/editor/${sheet.id}`}>
										<Typography>
											{sheet.name || sheet.id} -{" "}
											{sheet.dateAdded || "No date"}
										</Typography>
									</Link>
								</React.Fragment>
							);
						})
					) : (
						<div>
							<Typography>No sheets</Typography>
						</div>
					))
				) : (
					<div>
						<Typography>Loading...</Typography>
					</div>
				)}
			</div>
		</div>
	);
};
