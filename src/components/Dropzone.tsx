import { saveLoadedFileToDb } from "@/utils/db";
import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle: React.CSSProperties = {
	flex: 1,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	padding: "120px",
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
	const openMdFileFromPc = (file: File) => {
		const filename = file.name;
		let reader = new FileReader();
		reader.readAsText(file);
		reader.onload = () => {
			const file = reader.result;
			saveLoadedFileToDb(file, filename).then((id) => {
				window.location.href = `${id}`;
			});
		};
	};

	const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
		accept: { "text/markdown": [] },
		onDrop(acceptedFiles, fileRejections, event) {
			openMdFileFromPc(acceptedFiles[0]);
		},
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
				<p style={{ pointerEvents: "none" }}>
					Drag &apos;n&apos; drop some files here, or click to select files
				</p>
			</div>
		</section>
	);
};

export default Dropzone;
