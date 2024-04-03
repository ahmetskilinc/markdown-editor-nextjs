import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Card from "../../../components/Auth/Card";

export default async function SignInPage() {
	const supabase = createServerComponentClient({ cookies });
	const { data } = await supabase.auth.getSession();

	if (data?.session) {
		redirect("/");
	}

	return (
		<div className="max-w-sm md:max-w-md mx-auto mt-6 md:mt-12 grid place-items-center">
			<Card />
		</div>
	);
}
