"use client";

import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import classNames from "classnames";
import { useSearchParams } from "next/navigation";

const Card = () => {
	const searchParams = useSearchParams();

	const tabFromUrl = searchParams.get("tab") as "login" | "signup" | null;

	const [tab, setTab] = useState<"login" | "signup">(tabFromUrl || "login");
	const tabs = [
		{ name: "Login", current: tab === "login" },
		{ name: "Sign up", current: tab === "signup" },
	];
	return (
		<div className="max-w-lg min-w-96 border border-gray-900/10 rounded-lg shadow">
			<div>
				<div className="block">
					<nav
						className="isolate flex divide-x divide-gray-200 rounded-t-lg"
						aria-label="Tabs"
					>
						{tabs.map((tab, tabIdx) => (
							<div
								key={tab.name}
								onClick={() =>
									setTab(
										tab.name.replace(/\s/g, "").toLocaleLowerCase() as
											| "login"
											| "signup"
									)
								}
								className={classNames(
									tab.current
										? "text-gray-900"
										: "text-gray-500 hover:text-gray-700 border-b border-gray-200",
									tabIdx === 0 ? "rounded-tl-lg" : "",
									tabIdx === tabs.length - 1 ? "rounded-tr-lg" : "",
									"cursor-pointer group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
								)}
								aria-current={tab.current ? "page" : undefined}
							>
								<span>{tab.name}</span>
								<span
									aria-hidden="true"
									className={classNames(
										tab.current ? "bg-indigo-500" : "bg-transparent",
										"absolute inset-x-0 bottom-0 h-px"
									)}
								/>
							</div>
						))}
					</nav>
				</div>
			</div>
			{tab === "login" ? <Login /> : <SignUp />}
		</div>
	);
};

export default Card;
