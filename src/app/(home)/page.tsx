import { Hero } from "@/components/Hero";
import React from "react";
import { createClient } from "@/app/utils/server";
import UploadSheet from "@/components/UploadSheet";
import MySheets from "@/components/Common/MySheets";

const Page = async () => {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<main className="pt-16">
			{user ? (
				<div className="mx-auto max-w-7xl p-6 lg:px-8">
					<p className="my-2 text-lg text-black/60 font-medium">Upload a new sheet</p>
					<UploadSheet />
					<p className="mt-4 mb-2 text-lg text-black/60 font-medium">Your sheets</p>
					<MySheets />
				</div>
			) : (
				<Hero />
			)}
		</main>
	);
};

export default Page;
