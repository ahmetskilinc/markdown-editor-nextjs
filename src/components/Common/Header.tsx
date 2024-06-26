"use client";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import HeaderDesktopLink from "./HeaderDesktopLink";
import { cn } from "../../app/utils/cn";
import { createClient } from "@/app/utils/client";
import { useModal } from "@/providers/ModalProvider";

export default function Header({
	user,
	userSignedIn,
	wide = false,
}: {
	user?: any | null;
	userSignedIn: boolean;
	wide?: boolean;
}) {
	const [userAvatarUrl, setUserAvatarUrl] = useState<string | null>("");
	const supabase = createClient();
	const router = useRouter();
	const { openModal } = useModal();

	useEffect(() => {
		const channel = supabase
			.channel("realtime profile")
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "users",
				},
				() => {
					router.refresh();
				}
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [supabase, router]);

	useEffect(() => {
		const getUserAvatarUrl = async () => {
			const { data } = supabase.storage.from("avatars").getPublicUrl(user.avatar_id);

			setUserAvatarUrl(data.publicUrl);
		};

		if (user) {
			getUserAvatarUrl();
		}
	});

	function handleSignOut() {
		supabase.auth
			.signOut()
			.then(() => {
				router.refresh();
			})
			.catch((error) => {
				console.error(error);
			});
	}

	if (userSignedIn && !user) router.push("/onboarding-from-provider");

	// console.log(user);

	return (
		<>
			<Disclosure as="nav" className="bg-indigo-600 fixed shadow w-full z-40">
				{({ open }) => (
					<>
						<div
							className={cn(
								"mx-auto px-2 sm:px-6 lg:px-8",
								wide ? "max-w-none" : " max-w-7xl "
							)}
						>
							<div className="relative flex h-16 justify-between">
								{!user ? (
									<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
										{/* Mobile menu button */}
										<Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-white">
											<span className="sr-only">Open main menu</span>
											<div className="block w-[20px] -translate-y-[1px]">
												<span
													aria-hidden="true"
													className={`block absolute h-0.5 w-[20px] bg-current transform transition-all duration-200 ease-in-out rounded ${
														open ? " rotate-45" : " -translate-y-[6px]"
													}`}
												></span>
												<span
													aria-hidden="true"
													className={`block absolute h-0.5 w-[20px] bg-current transform transition-all duration-200 ease-in-out rounded ${
														open && " opacity-0"
													}`}
												></span>
												<span
													aria-hidden="true"
													className={`block absolute h-0.5 w-[20px] bg-current transform transition-all duration-200 ease-in-out rounded ${
														open ? "-rotate-45" : " translate-y-[6px]"
													}`}
												></span>
											</div>
										</Disclosure.Button>
									</div>
								) : null}
								<div
									className={cn(
										"flex flex-1 items-center sm:items-stretch sm:justify-start",
										user ? "justify-start ml-3 sm:ml-0" : "justify-center"
									)}
								>
									<div className="flex flex-shrink-0 items-center font-serif">
										<Link href="/">
											<img className="h-[22px] w-auto" src="/logo.png" />
										</Link>
									</div>
									{!user ? (
										<div className="hidden sm:ml-6 sm:flex sm:space-x-8">
											<HeaderDesktopLink title="About" link="/about" />
											<HeaderDesktopLink title="Pricing" link="/pricing" />
											<HeaderDesktopLink
												title="Contact us"
												link="/contact-us"
											/>
										</div>
									) : null}
								</div>
								<div className="absolute inset-y-0 right-0 flex gap-4 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
									{user ? (
										<>
											<button
												className="shadow rounded-md bg-indigo-700 px-6 py-2 text-sm font-normal text-white hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
												type="button"
												onClick={() => openModal("new-sheet")}
											>
												New sheet
											</button>
											<Menu as="div" className="relative">
												<Menu.Button className="-m-1.5 flex items-center p-1.5">
													<span className="sr-only">Open user menu</span>
													{userAvatarUrl &&
													!userAvatarUrl?.includes("null") ? (
														<img
															className="h-8 w-8 rounded-full bg-gray-50"
															src={userAvatarUrl}
															alt=""
														/>
													) : (
														<img
															className="h-8 w-8 rounded-full bg-gray-50"
															src="/default.jpg"
															alt=""
														/>
													)}
													<span className="hidden sm:flex sm:items-center">
														<span
															className="ml-4 text-sm leading-6 text-white"
															aria-hidden="true"
														>
															{user.first_name} {user.last_name}
														</span>
														<ChevronDownIcon
															className="ml-2 h-6 w-[18px] text-gray-100"
															aria-hidden="true"
														/>
													</span>
												</Menu.Button>
												<Transition
													as={Fragment}
													enter="transition ease-out duration-100"
													enterFrom="transform opacity-0 scale-95"
													enterTo="transform opacity-100 scale-100"
													leave="transition ease-in duration-75"
													leaveFrom="transform opacity-100 scale-100"
													leaveTo="transform opacity-0 scale-95"
												>
													<Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
														<Menu.Item
															as={Link}
															href="/account"
															className="block px-3 py-1 text-sm leading-6 text-gray-900"
														>
															Account
														</Menu.Item>
														{/* <Menu.Item
															as={Link}
															href="/settings"
															className="block px-3 py-1 text-sm leading-6 text-gray-900"
														>
															Settings
														</Menu.Item> */}
														<Menu.Item
															as="button"
															onClick={handleSignOut}
															className="block px-3 py-1 text-sm leading-6 text-gray-900"
														>
															Logout
														</Menu.Item>
													</Menu.Items>
												</Transition>
											</Menu>
										</>
									) : (
										<Link
											href="/sign-in"
											className="inline-flex items-center px-1 pt-1 text-sm font-medium text-white hover:text-gray-200"
										>
											Sign in
										</Link>
									)}
								</div>
							</div>
						</div>

						<Disclosure.Panel className="sm:hidden">
							<div className="space-y-2 py-2">
								{!user ? (
									<Fragment>
										<Disclosure.Button
											as={Link}
											href="/about"
											className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-white hover:text-gray-100"
										>
											About
										</Disclosure.Button>
										<Disclosure.Button
											as={Link}
											href="/pricing"
											className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-white hover:text-gray-100"
										>
											Pricing
										</Disclosure.Button>
										<Disclosure.Button
											as={Link}
											href="/contact-us"
											className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-white hover:text-gray-100"
										>
											Contact us
										</Disclosure.Button>
									</Fragment>
								) : null}
								{/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</>
	);
}
