"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import cn from "classnames";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import ErrorText from "../Common/ErrorText";

const UpdatePasswordSchema = Yup.object().shape({
	password: Yup.string().required("Enter a password to change it"),
});

const UpdatePassword = () => {
	const supabase = createClientComponentClient();
	const router = useRouter();
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	async function updatePassword(formData: { password: string }) {
		const { error } = await supabase.auth.updateUser({
			password: formData.password,
		});

		if (error) {
			setErrorMsg(error.message);
		} else {
			// Go to Home page
			router.replace("/");
		}
	}

	return (
		<div className="max-w-lg mx-auto mt-6 md:mt-12 grid place-items-center">
			<div className="min-w-96 border border-gray-900/10 rounded-lg shadow">
				<div className="space-y-12 p-6 w-full">
					<div className="flex flex-col gap-6">
						<h2 className="text-xl font-semibold leading-7 text-gray-900">Login</h2>
						{errorMsg && <ErrorText>{errorMsg}</ErrorText>}
						<Formik
							initialValues={{
								password: "",
							}}
							validationSchema={UpdatePasswordSchema}
							onSubmit={updatePassword}
						>
							{({ errors, touched }) => (
								<Form className="space-y-12">
									<div>
										<label
											htmlFor="email"
											className="block text-sm font-medium leading-6 text-gray-900"
										>
											New Password
										</label>
										<div className="mt-2">
											<Field
												className={cn(
													"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
													errors.password &&
														touched.password &&
														"bg-red-50"
												)}
												id="password"
												name="password"
												type="password"
											/>
											{errors.password && touched.password ? (
												<p className="text-red-600 text-sm">
													{errors.password}
												</p>
											) : null}
										</div>
									</div>
									<button
										className="w-full shadow rounded-md bg-indigo-600 px-8 py-2 text-sm font-normal text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
										type="submit"
									>
										Update Password
									</button>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UpdatePassword;
