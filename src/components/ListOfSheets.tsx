"use client";

import React, { useEffect, useState } from "react";
import Dropzone from "./Dropzone";
import { getSheetsFromDb } from "@/utils/db";
import { Sheets } from "./Sheets";
import { Sheet } from "./Sheet";

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
		<div>
			<Dropzone />
			<div>
				<p className="mb-2">Your locally saved sheets</p>
			</div>
			<div>
				{loaded ? (
					sheets &&
					(sheets.length > 0 ? (
						<Sheets sheets={sheets} />
					) : (
						<div>
							<p>No sheets</p>
						</div>
					))
				) : (
					<div>
						<p>Loading...</p>
					</div>
				)}
			</div>
		</div>
	);
};
