import { PaperClipIcon, CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { FormikErrors, FormikTouched, FormikValues } from "formik";
import { Accept, DropEvent, useDropzone } from "react-dropzone";
import ErrorText from "./ErrorText";
import React from "react";

export const Dropzone = ({
	setFieldValue,
	setFieldError,
	name,
	accept,
	values,
	errors,
	touched,
	onDropAccepted,
}: {
	setFieldValue: (
		field: string,
		value: any,
		shouldValidate?: boolean | undefined
	) => Promise<void | FormikErrors<{}>>;
	setFieldError: (field: string, message: string | undefined) => void;
	name: string;
	accept: Accept;
	values: FormikValues;
	errors: FormikErrors<FormikValues>;
	touched: FormikTouched<FormikValues>;
	onDropAccepted?: (files: File[], event: DropEvent) => void;
}) => {
	const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
		accept,
		onDrop: (acceptedFiles) => {
			setFieldValue(name, acceptedFiles);
		},
		onError: (error) => {
			setFieldError(name, error.message);
		},
		onDropRejected: (rejected, event) => {
			setFieldError(name, rejected[0].errors[0].message);
		},
		onDropAccepted: (files, event) => {
			onDropAccepted ? onDropAccepted(files, event) : null;
		},
		maxFiles: 1,
	});

	const iconClasses = classNames(
		"h-5 w-5 flex-shrink-0",
		isDragActive ? (isDragReject ? "text-red-700" : "text-green-700") : "text-gray-400"
	);

	const Icon = () => {
		return isDragActive ? (
			isDragReject ? (
				<XMarkIcon className={iconClasses} aria-hidden="true" />
			) : (
				<CheckIcon className={iconClasses} aria-hidden="true" />
			)
		) : (
			<PaperClipIcon className={iconClasses} aria-hidden="true" />
		);
	};
	return (
		<div>
			<div {...getRootProps({ className: "dropzone" })}>
				<ul
					role="list"
					className={classNames(
						"rounded-md border border-gray-300 transition-all cursor-pointer",
						!values[name].length ? "border-dashed" : "shadow-sm",
						isDragActive
							? isDragReject
								? "bg-red-200"
								: "bg-green-200"
							: "bg-gray-100 hover:bg-gray-200 hover:border-gray-400 "
					)}
				>
					<input {...getInputProps()} />
					{!values[name].length ? (
						<li className="flex items-center justify-between py-10 sm:py-4 pl-4 pr-5 text-sm leading-6">
							<div className="flex w-0 flex-1 items-center">
								<Icon />
								<div className="ml-4 flex min-w-0 flex-1 gap-2">
									<span
										className={classNames(
											"truncate font-medium",
											isDragActive
												? isDragReject
													? "text-red-700"
													: "text-green-700"
												: "text-gray-400"
										)}
									>
										{isDragActive ? (
											isDragReject ? (
												"File type is not accepted"
											) : (
												"Drop file here"
											)
										) : (
											<React.Fragment>
												<span className="hidden sm:block">
													Drag a file here or click to select one
												</span>
												<span className="block sm:hidden">
													Tap to select a file
												</span>
											</React.Fragment>
										)}
									</span>
								</div>
							</div>
						</li>
					) : values[name] ? (
						values[name].map((file: File) => (
							<li
								key={file.name}
								className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
							>
								<div className="flex w-0 flex-1 items-center">
									<Icon />
									<div className="ml-4 flex min-w-0 flex-1 gap-2">
										<span className="truncate font-medium">{file.name}</span>
										<span className="flex-shrink-0 text-gray-400">
											{(file.size / 1e6).toFixed(2)}MB
										</span>
									</div>
								</div>
							</li>
						))
					) : null}
				</ul>
			</div>
			{errors[name] && touched[name] ? <ErrorText>{errors[name] as string}</ErrorText> : null}
		</div>
	);
};
