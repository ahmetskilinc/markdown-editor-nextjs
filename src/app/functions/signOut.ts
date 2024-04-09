"use server";
import { createClient } from "../utils/server";

export async function signOut() {
	const supabase = createClient();
	const { error } = await supabase.auth.signOut();

	if (error) {
		console.error("ERROR:", error);
	}
}
