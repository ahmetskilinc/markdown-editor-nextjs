import { redirect } from "next/navigation";

import Card from "../../../components/Auth/Card";
import { createClient } from "@/app/utils/server";

export default async function SignInPage() {
	const supabase = createClient();
	const { data } = await supabase.auth.getUser();

	if (data?.user) {
		redirect("/");
	}

	return (
		<div className="max-w-sm md:max-w-md mx-auto mt-6 md:mt-12 grid place-items-center">
			<Card />
		</div>
	);
}
