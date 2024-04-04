"use server";

import { createClient } from "../utils/server";

export async function signIn(formData: { email: string; password: string }) {
	const supabase = createClient();

	const { error } = await supabase.auth.signInWithPassword({
		email: formData.email,
		password: formData.password,
	});

	if (error) {
		return error.message;
	}
}
