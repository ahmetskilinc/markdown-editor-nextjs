"use client";

import { Modal, useModal } from "@faceless-ui/modal";
import { newSheet } from "../../app/functions/newSheet";
import { useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import ErrorText from "../Common/ErrorText";
import { cn } from "@/app/utils/cn";
import { useRouter } from "next/navigation";

const SignInSchema = Yup.object().shape({
	fileName: Yup.string().required("A name is required to create a file."),
});

const NewSheet = () => {
	const [errorMsg] = useState<string | null>(null);
	const router = useRouter();
	const { toggleModal } = useModal();

	return (
		<Modal slug="new-sheet" className="new-sheet">
			<div className="new-sheet__wrapper">
				<div className="new-sheet__content">
					<div className="space-y-12 p-6 w-full">
						<div className="flex flex-col gap-6">
							<h2 className="text-xl font-semibold leading-7 text-gray-900">
								New sheet
							</h2>
							{errorMsg && <ErrorText>{errorMsg}</ErrorText>}
							<Formik
								initialValues={{
									fileName: "",
								}}
								validationSchema={SignInSchema}
								onSubmit={async (formData) => {
									await newSheet(formData).then((data) => {
										toggleModal("new-sheet");
										router.push(`/${data.id}`);
									});
								}}
							>
								{({ errors, touched }) => (
									<Form className="space-y-12">
										<div className="space-y-4">
											<div>
												<label
													htmlFor="email"
													className="block text-sm font-medium leading-6 text-gray-900"
												>
													File name
												</label>
												<div className="mt-2">
													<Field
														className={cn(
															"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
															errors.fileName &&
																touched.fileName &&
																"bg-red-50"
														)}
														id="fileName"
														name="fileName"
														placeholder="File name"
													/>
													{errors.fileName && touched.fileName ? (
														<ErrorText>{errors.fileName}</ErrorText>
													) : null}
												</div>
											</div>
										</div>

										<div className="mt-6 flex flex-col">
											<div className="w-full flex items-center justify-end">
												<button
													className="shadow rounded-md bg-indigo-600 px-6 py-2 text-sm font-normal text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
													type="submit"
												>
													Create
												</button>
											</div>
										</div>
									</Form>
								)}
							</Formik>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default NewSheet;
