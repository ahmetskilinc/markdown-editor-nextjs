import { ListOfSheets } from "@/components/ListOfSheets";
import { Hero } from "@/components/Hero";
import React from "react";
import { createClient } from "@/app/utils/server";

type Props = {};

const Page = async (props: Props) => {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<main className="pt-16">
			{user ? (
				<div className="mx-auto max-w-7xl p-6 lg:px-8">
					<ListOfSheets />
				</div>
			) : (
				<Hero />
			)}
		</main>
	);
};

export default Page;
