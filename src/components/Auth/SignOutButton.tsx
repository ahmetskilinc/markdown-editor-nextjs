"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import classNames from "classnames";

export default function SignOut({ className }: { className?: string }) {
	const supabase = createClientComponentClient();

	async function handleSignOut() {
		const { error } = await supabase.auth.signOut();

		if (error) {
			// eslint-disable-next-line no-console
			console.error("ERROR:", error);
		}
	}

	return (
		<button
			className={classNames(
				"relative rounded-full bg-white p-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm cursor-pointer",
				className
			)}
			onClick={handleSignOut}
		>
			Logout
		</button>
	);
}
