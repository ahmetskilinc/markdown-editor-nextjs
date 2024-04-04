"use client";

import { handleSignOut } from "@/app/functions/signOut";
import { createClient } from "@/app/utils/client";
import classNames from "classnames";

export default function SignOut({ className }: { className?: string }) {
	return (
		<button
			className={classNames(
				"relative rounded-full bg-white p-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm cursor-pointer",
				className
			)}
			onClick={async () => {
				await handleSignOut();
			}}
		>
			Logout
		</button>
	);
}
