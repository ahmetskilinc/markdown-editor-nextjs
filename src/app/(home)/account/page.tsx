import { createClient } from "@/app/utils/server";
import ProfileTabs from "@/components/User/Profile/ProfileTabs";
import type { Database } from "@/types/supabase.types";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) redirect("/sign-in");

	const { data, error } = await supabase.from("users").select("*").match({ user_id: user.id });
	const userProfile: Database["public"]["Tables"]["users"]["Row"] = data![0];

	return (
		<main className="pt-16">
			<div className="mx-auto max-w-7xl p-6 lg:px-8">
				<ProfileTabs userProfile={userProfile} user={user} />
			</div>
		</main>
	);
};

export default Page;
