"use client";

import { useState } from "react";
import cn from "classnames";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import ErrorText from "../Common/ErrorText";
import { createClient } from "@/app/utils/client";
import { signIn } from "@/app/functions/signIn";

const SignInSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Email is required"),
	password: Yup.string().required("Password is required"),
});

const Login = () => {
	const supabase = createClient();
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	return (
		<div className="space-y-12 p-6 w-full">
			<div className="flex flex-col gap-6">
				<h2 className="text-xl font-semibold leading-7 text-gray-900">Login</h2>
				{errorMsg && <ErrorText>{errorMsg}</ErrorText>}
				<Formik
					initialValues={{
						email: "",
						password: "",
					}}
					validationSchema={SignInSchema}
					onSubmit={async (formData) => {
						console.log("on client");
						await signIn(formData);
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
											placeholder="Email address"
											type="email"
											autoComplete="email"
										/>
										{errors.email && touched.email ? (
											<ErrorText>{errors.email}</ErrorText>
										) : null}
									</div>
								</div>

								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Password
									</label>
									<div className="mt-2">
										<Field
											className={cn(
												"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
												errors.password && touched.password && "bg-red-50"
											)}
											placeholder="Password"
											id="password"
											name="password"
											type="password"
										/>
										{errors.password && touched.password ? (
											<ErrorText>{errors.password}</ErrorText>
										) : null}
									</div>
								</div>
							</div>

							<div className="mt-6 flex flex-col gap-x-6 gap-y-4 divide-y-2">
								<div className="w-full flex items-center justify-end gap-x-6">
									<Link
										href="/reset-password"
										className="text-xs hover:underline"
									>
										Forgot password
									</Link>

									<button
										className="shadow rounded-md bg-indigo-600 px-6 py-2 text-sm font-normal text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
										type="submit"
									>
										Login
									</button>
								</div>

								<div className="w-full pt-4 space-y-4">
									<button
										className="w-full shadow rounded-md bg-white px-6 py-2 text-sm font-normal text-black hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
										type="button"
									>
										Sign in with Google
									</button>
									<button
										className="w-full shadow rounded-md bg-black px-6 py-2 text-sm font-normal text-white hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
										type="button"
									>
										Sign in with Github
									</button>
								</div>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default Login;
