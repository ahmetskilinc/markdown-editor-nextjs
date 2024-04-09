"use client";

import { newSheet } from "@/app/functions/newSheet";
import { cn } from "@/app/utils/cn";
import { useModal } from "@/providers/ModalProvider";
import { Dialog, Transition } from "@headlessui/react";
import { Field, Form, Formik } from "formik";
import { Fragment } from "react";
import * as Yup from "yup";
import ErrorText from "../Common/ErrorText";
import { useRouter } from "next/navigation";

const SignInSchema = Yup.object().shape({
	fileName: Yup.string().required("A name is required to create a file."),
});

export default function MyModal() {
	const router = useRouter();
	const { isOpen, toggleModal } = useModal();

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={toggleModal}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className="mb-6 text-lg font-medium leading-6 text-gray-900"
								>
									New sheet
								</Dialog.Title>
								<div>
									<Formik
										initialValues={{
											fileName: "",
										}}
										validationSchema={SignInSchema}
										onSubmit={async (formData) => {
											await newSheet(formData).then((data) => {
												toggleModal();
												router.push(
													`/${typeof data !== "string" ? data.id : null}`
												);
											});
										}}
									>
										{({ errors, touched }) => (
											<Form className="space-y-10">
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
																<ErrorText>
																	{errors.fileName}
																</ErrorText>
															) : null}
														</div>
													</div>
												</div>

												<div className="w-full flex items-center justify-end">
													<button
														className="shadow rounded-md bg-indigo-600 px-6 py-2 text-sm font-normal text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
														type="submit"
													>
														Create
													</button>
												</div>
											</Form>
										)}
									</Formik>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
