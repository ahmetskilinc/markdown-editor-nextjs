"use client";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Dropzone } from "./Common/Dropzone";
import ErrorText from "./Common/ErrorText";

type Props = {};

const UploadDocumentSchema = Yup.object().shape({
	document: Yup.mixed().nullable(),
});

const UploadSheet = (props: Props) => {
	async function handleSubmit(formData: { document: File[] }) {
		console.log(formData);
	}

	return (
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
	);
};

export default UploadSheet;
