"use client";

import { useState } from "react";
import cn from "classnames";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import ErrorText from "../Common/ErrorText";
import { createClient } from "@/app/utils/client";

const ResetPasswordSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Required"),
});

const ResetPassword = () => {
	const supabase = createClient();
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [successMsg, setSuccessMsg] = useState<string | null>(null);

	async function resetPassword(formData: { email: string }) {
		const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
			redirectTo: `${window.location.origin}/auth/update-password`,
		});

		if (error) {
			setErrorMsg(error.message);
		} else {
			setSuccessMsg("Password reset instructions sent.");
		}
	}

	return (
		<div className="max-w-lg mx-auto mt-6 md:mt-12 grid place-items-center">
			<div className="min-w-96 border border-gray-900/10 rounded-lg shadow">
				<div className="space-y-12 p-6">
					<div className="flex flex-col gap-6">
						<h2 className="text-xl font-semibold leading-7 text-gray-900">
							Forgot password
						</h2>
						{errorMsg && <ErrorText>{errorMsg}</ErrorText>}
						{successMsg && <div className="text-center text-black">{successMsg}</div>}
						<Formik
							initialValues={{
								email: "",
							}}
							validationSchema={ResetPasswordSchema}
							onSubmit={resetPassword}
						>
							{({ errors, touched }) => (
								<Form className="space-y-12">
									<div>
										<label
											htmlFor="email"
											className="block text-sm font-medium leading-6 text-gray-900"
										>
											Email address
										</label>
										<div className="mt-2">
											<Field
												className={cn(
													"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
													errors.email && touched.email && "bg-red-50"
												)}
												id="email"
												name="email"
												placeholder="jane@acme.com"
												type="email"
											/>
											{errors.email && touched.email ? (
												<div className="text-red-600">{errors.email}</div>
											) : null}
										</div>
									</div>
									<button
										className="w-full shadow rounded-md bg-indigo-600 px-8 py-2 text-sm font-normal text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
										type="submit"
									>
										Send Instructions
									</button>
								</Form>
							)}
						</Formik>
						<p className="text-xs">
							Remember your password?{" "}
							<Link href="/sign-in" className="hover:underline">
								Sign In
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResetPassword;
