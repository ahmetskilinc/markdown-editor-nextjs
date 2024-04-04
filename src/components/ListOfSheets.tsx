"use client";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Dropzone } from "./Common/Dropzone";
import ErrorText from "./Common/ErrorText";
import { Sheet } from "./Sheet";
import { Sheets } from "./Sheets";
import { createClient } from "@/app/utils/client";
import { useEffect, useState } from "react";

const UploadDocumentSchema = Yup.object().shape({
	document: Yup.mixed().nullable(),
});

export const ListOfSheets = () => {
	const supabase = createClient();
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [sheets, setSheets] = useState<Sheet[] | null>(null);

	async function handleSubmit(formData: { document: File[] }) {
		console.log(formData);
	}

	useEffect(() => {
		async function getSheets() {
			const user = await supabase.auth.getUser().then(({ data }) => data);
			const data = await supabase
				.from("sheets")
				.select("*")
				.match({ user_id: user?.user?.id });

			setSheets(data.data);
		}

		getSheets();
	}, []);

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
				{sheets && sheets.length > 0 ? (
					<Sheets sheets={sheets} />
				) : (
					<div>
						<p>No sheets</p>
					</div>
				)}
			</div>
		</div>
	);
};
