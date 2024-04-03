"use client";

import { getSheetsFromDb, saveLoadedFileToDb } from "@/utils/db";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Dropzone } from "./Common/Dropzone";
import ErrorText from "./Common/ErrorText";
import { Sheet } from "./Sheet";
import { Sheets } from "./Sheets";

const UploadDocumentSchema = Yup.object().shape({
	document: Yup.mixed().nullable(),
});

export const ListOfSheets = () => {
	const [sheets, setSheets] = useState<Sheet[] | null>(null);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		getSheetsFromDb().then((sheets) => {
			setSheets(sheets);
			setLoaded(true);
		});
	}, []);

	const handleSubmit = (formData: { document: File[] }) => {
		openMdFileFromPc(formData.document[0]);
	};

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

	return (
		<div>
			<Formik
				initialValues={{
					document: [] as any,
				}}
				validationSchema={UploadDocumentSchema}
				onSubmit={handleSubmit}
			>
				{({
					values,
					errors,
					touched,
					isSubmitting,
					setFieldValue,
					setFieldError,
					submitForm,
				}) => (
					<Form className="space-y-12">
						<div className="mt-2 md:mt-0 flex-grow">
							<Dropzone
								setFieldValue={setFieldValue}
								setFieldError={setFieldError}
								values={values}
								errors={errors}
								touched={touched}
								name="document"
								accept={{
									"text/markdown": [".md"],
								}}
								onDropAccepted={(files, event) => {
									submitForm();
								}}
							/>
							{errors.document && touched.document ? (
								<ErrorText>{errors.document.toString()}</ErrorText>
							) : null}
						</div>
					</Form>
				)}
			</Formik>
			<div>
				<p className="mt-4 mb-2">Your locally saved sheets</p>
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
