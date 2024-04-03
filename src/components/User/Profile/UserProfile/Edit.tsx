"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import classNames from "classnames";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { MoonLoader } from "react-spinners";
import * as Yup from "yup";
import { Dropzone } from "../../../Common/Dropzone";
import ErrorText from "../../../Common/ErrorText";
import { UserProfile } from "@/types/UserProfile";

type Props = {
	user: UserProfile;
};

const EditProfileSchema = Yup.object().shape({
	first_name: Yup.string().required("First name is required"),
	last_name: Yup.string().required("Last name is required"),
	avatar: Yup.mixed().nullable(),
});

const Edit = ({ user }: Props) => {
	const supabase = createClientComponentClient();
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [successMsg, setSuccessMsg] = useState<string | null>(null);

	async function saveProfile(formData: {
		first_name: string;
		last_name: string;
		avatar: File[] | null;
		dob: string;
		username: string;
	}) {
		let avatar_id: string = "";

		if (formData.avatar) {
			const { error: avatarUploadError, data } = await supabase.storage
				.from("avatars")
				.upload(
					`${user.user_id}.${formData.avatar[0].type.split("/")[1]}`,
					formData.avatar[0],
					{
						upsert: true,
					}
				);

			avatar_id = data?.path!;
		} else {
			console.log("no avatar");
		}

		const { error: profileUpdateError } = await supabase
			.from("users")
			.update({
				first_name: formData.first_name,
				last_name: formData.last_name,
				avatar_id: avatar_id ? avatar_id : null,
				username: formData.username,
				dob: formData.dob,
			})
			.eq("user_id", user.user_id);

		if (profileUpdateError) {
			setErrorMsg(profileUpdateError.message);
			setSuccessMsg(null);
		} else {
			setErrorMsg(null);
			setSuccessMsg("Success! Profile has been saved.");
		}
	}

	return (
		<div>
			<Formik
				initialValues={{
					first_name: user.first_name,
					last_name: user.last_name,
					avatar: [] as any,
					dob: user.dob,
					username: user.username,
				}}
				validationSchema={EditProfileSchema}
				onSubmit={saveProfile}
			>
				{({ values, errors, touched, isSubmitting, setFieldValue, setFieldError }) => (
					<Form className="space-y-12">
						<div className="space-y-4">
							{errorMsg && <ErrorText>{errorMsg}</ErrorText>}
							{successMsg && <p className="text-black text-sm">{successMsg}</p>}
							<div className="">
								<label
									htmlFor="first_name"
									className="block text-sm font-medium leading-6 text-gray-900 w-full"
								>
									First name
								</label>
								<div className="mt-2">
									<Field
										className={classNames(
											"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
											errors.first_name && touched.first_name && "bg-red-50"
										)}
										id="first_name"
										name="first_name"
									/>
									{errors.first_name && touched.first_name ? (
										<ErrorText>{errors.first_name}</ErrorText>
									) : null}
								</div>
							</div>
							<div className="">
								<label
									htmlFor="last_name"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Last name
								</label>
								<div className="mt-2">
									<Field
										className={classNames(
											"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
											errors.last_name && touched.last_name && "bg-red-50"
										)}
										id="last_name"
										name="last_name"
									/>
									{errors.last_name && touched.last_name ? (
										<ErrorText>{errors.last_name}</ErrorText>
									) : null}
								</div>
							</div>
							<div className="">
								<label
									htmlFor="avatar"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Username
								</label>
								<div className="mt-2">
									<Field
										className={classNames(
											"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
											errors.username && touched.username && "bg-red-50"
										)}
										id="username"
										name="username"
									/>
									{errors.username && touched.username ? (
										<ErrorText>{errors.username}</ErrorText>
									) : null}
								</div>
							</div>
							<div className="">
								<label
									htmlFor="avatar"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Date of birth
								</label>
								<div className="mt-2 md:mt-0  w-full">
									<Field
										className={classNames(
											"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
											errors.dob && touched.dob && "bg-red-50"
										)}
										id="dob"
										name="dob"
										type="date"
									/>
									{errors.dob && touched.dob ? (
										<ErrorText>{errors.dob}</ErrorText>
									) : null}
								</div>
							</div>

							<div className="">
								<label
									htmlFor="avatar"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Avatar
								</label>
								<div className="mt-2 md:mt-0 flex-grow">
									<Dropzone
										setFieldValue={setFieldValue}
										setFieldError={setFieldError}
										values={values}
										errors={errors}
										touched={touched}
										name="avatar"
										accept={{
											"image/png": [".png"],
											"image/jpeg": [".jpeg", ".jpg"],
										}}
									/>
								</div>
							</div>
						</div>

						<div className="mt-6 flex items-center justify-end gap-x-6">
							<button
								disabled={isSubmitting}
								type="submit"
								className="flex items-center justify-center gap-2 flex-row shadow rounded-md bg-indigo-600 px-8 py-2 text-sm font-normal text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300 disabled:hover:bg-indigo-300"
							>
								{isSubmitting ? <MoonLoader size={12} /> : null} Save
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default Edit;
