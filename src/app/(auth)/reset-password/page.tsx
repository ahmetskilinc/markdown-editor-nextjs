import { redirect } from "next/navigation";

import ResetPassword from "../../../components/Auth/ResetPassword";
import { createClient } from "@/app/utils/server";

export default async function ResetPasswordPage() {
	const supabase = createClient();
	const { data } = await supabase.auth.getUser();

	if (data?.user) {
		redirect("/");
	}

	return <ResetPassword />;
}
