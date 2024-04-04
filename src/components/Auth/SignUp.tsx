"use client";

import { useState } from "react";
import cn from "classnames";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import ErrorText from "../Common/ErrorText";
import { FacebookLoginButton } from "react-social-login-buttons";
import { createClient } from "@/app/utils/client";

const SignUpSchema = Yup.object().shape({
	"first-name": Yup.string().required("You must enter your first name"),
	"last-name": Yup.string().required("You must enter your last name"),
	// dob: Yup.date()
	// 	.required("You must enter your date of birth")
	// 	.max(new Date(Date.now() - 567648000000), "You must be at least 18 years old"),
	username: Yup.string().required("You must enter your a unique username"),
	email: Yup.string().email("Invalid email").required("You must enter an email address"),
	password: Yup.string().required("You must enter a password"),
	passwordConfirm: Yup.string()
		.required("You must confirm your password")
		.oneOf([Yup.ref("password")], "Passwords must match"),
});

const SignUp = () => {
	const supabase = createClient();
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [successMsg, setSuccessMsg] = useState<string | null>(null);

	async function signUp(formData: {
		email: string;
		password: string;
		passwordConfirm: string;
		"first-name": string;
		"last-name": string;
		// dob: string;
		username: string;
	}) {
		const { error, data } = await supabase.auth.signUp({
			email: formData.email,
			password: formData.password,
		});

		if (!error) {
			await supabase.from("users").insert({
				username: formData.username,
				first_name: formData["first-name"],
				last_name: formData["last-name"],
				// dob: formData.dob,
				user_id: data.user?.id,
			});
		}

		if (error) {
			setErrorMsg(error.message);
		} else {
			setSuccessMsg("Success! Please check your email for further instructions.");
		}
	}

	return (
		<div className="space-y-12 p-6 w-full">
			<div className="flex flex-col gap-6">
				<h2 className="text-xl font-semibold leading-7 text-gray-900">Sign up</h2>
				<Formik
					initialValues={{
						email: "",
						password: "",
						passwordConfirm: "",
						"first-name": "",
						"last-name": "",
						// dob: "",
						username: "",
					}}
					validationSchema={SignUpSchema}
					onSubmit={signUp}
				>
					{({ errors, touched }) => (
						<Form className="space-y-8">
							<div className="space-y-4">
								{errorMsg && <ErrorText>{errorMsg}</ErrorText>}
								{successMsg && <p className="text-black">{successMsg}</p>}

								<div className="flex gap-4">
									<div>
										<label
											htmlFor="first-name"
											className="block text-sm font-medium leading-6 text-gray-900"
										>
											First name
										</label>
										<div className="mt-2">
											<Field
												className={cn(
													"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
													errors["first-name"] && "bg-red-50"
												)}
												id="first-name"
												name="first-name"
												placeholder="First name"
											/>
											{errors["first-name"] && touched["first-name"] ? (
												<ErrorText>{errors["first-name"]}</ErrorText>
											) : null}
										</div>
									</div>

									<div>
										<label
											htmlFor="last-name"
											className="block text-sm font-medium leading-6 text-gray-900"
										>
											Last name
										</label>
										<div className="mt-2">
											<Field
												className={cn(
													"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
													errors["last-name"] && "bg-red-50"
												)}
												id="last-name"
												name="last-name"
												placeholder="Last name"
											/>
											{errors["last-name"] && touched["last-name"] ? (
												<ErrorText>{errors["last-name"]}</ErrorText>
											) : null}
										</div>
									</div>
								</div>

								{/* <div>
									<label
										htmlFor="dob"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Date of birth
									</label>
									<div className="mt-2">
										<Field
											className={cn(
												"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
												errors["dob"] && "bg-red-50"
											)}
											id="dob"
											name="dob"
											// placeholder="dob"
											type="date"
										/>
										{errors["dob"] && touched["dob"] ? (
											<ErrorText>{errors["dob"]}</ErrorText>
										) : null}
									</div>
								</div> */}

								<div>
									<label
										htmlFor="username"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Username
									</label>
									<div className="mt-2">
										<Field
											className={cn(
												"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
												errors["username"] && "bg-red-50"
											)}
											id="username"
											name="username"
											placeholder="Username"
										/>
										{errors["username"] && touched["username"] ? (
											<ErrorText>{errors["username"]}</ErrorText>
										) : null}
									</div>
								</div>

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
												errors.email && "bg-red-50"
											)}
											id="email"
											name="email"
											placeholder="Email address"
											type="email"
										/>
										{errors.email && touched.email ? (
											<ErrorText>{errors.email}</ErrorText>
										) : null}
									</div>
								</div>

								<div>
									<label
										htmlFor="password"
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

								<div>
									<label
										htmlFor="password"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Confirm Password
									</label>
									<div className="mt-2">
										<Field
											className={cn(
												"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
												errors.passwordConfirm &&
													touched.passwordConfirm &&
													"bg-red-50"
											)}
											placeholder="Confirm password"
											id="passwordConfirm"
											name="passwordConfirm"
											type="password"
										/>
										{errors.passwordConfirm && touched.passwordConfirm ? (
											<ErrorText>{errors.passwordConfirm}</ErrorText>
										) : null}
									</div>
								</div>
							</div>

							<div className="mt-2 flex flex-col items-center justify-end gap-x-6 gap-y-4 divide-y-2">
								<div className="w-full">
									<button
										type="submit"
										className="w-full shadow rounded-md bg-indigo-500 px-6 py-2 text-sm font-normal text-white hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
									>
										Sign up
									</button>
								</div>
								<div className="w-full pt-4 space-y-4">
									<button
										className="w-full shadow rounded-md bg-white px-6 py-2 text-sm font-normal text-black hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
										type="button"
									>
										Sign up with Google
									</button>
									<button
										className="w-full shadow rounded-md bg-black px-6 py-2 text-sm font-normal text-white hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
										type="button"
									>
										Sign up with Github
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

export default SignUp;
