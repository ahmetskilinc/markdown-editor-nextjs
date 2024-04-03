import { Hero, ListOfSheets } from "@/components";
import React from "react";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

type Props = {};

const Page = async (props: Props) => {
	const supabase = createServerComponentClient({ cookies });

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<main>
			{user ? (
				<div className=" mx-auto max-w-7xl p-6 lg:px-8">
					<ListOfSheets />
				</div>
			) : (
				<Hero />
			)}
		</main>
	);
};

export default Page;
