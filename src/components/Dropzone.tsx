import { Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle: React.CSSProperties = {
	flex: 1,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	padding: "64px",
	margin: "20px 0 20px 0",
	borderWidth: 2,
	borderRadius: 2,
	borderColor: "#eeeeee",
	borderStyle: "dashed",
	backgroundColor: "#fafafa",
	color: "#bdbdbd",
	outline: "none",
	transition: "border .24s ease-in-out",
	cursor: "pointer",
};

const focusedStyle: React.CSSProperties = {
	borderColor: "#2196f3",
};

const acceptStyle: React.CSSProperties = {
	borderColor: "#00e676",
};

const rejectStyle: React.CSSProperties = {
	borderColor: "#ff1744",
};

const Dropzone = () => {
	const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
		accept: { "text/markdown": [] },
	});

	const style = useMemo(
		() => ({
			...baseStyle,
			...(isFocused ? focusedStyle : {}),
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),
		[isFocused, isDragAccept, isDragReject]
	);

	return (
		<section className="container">
			<div {...getRootProps({ style })}>
				<input {...getInputProps()} />
				<Typography style={{ pointerEvents: "none" }}>
					Drag &apos;n&apos; drop some files here, or click to select files
				</Typography>
			</div>
		</section>
	);
};

export default Dropzone;
