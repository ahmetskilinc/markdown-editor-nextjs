"use server";

import { createClient } from "../utils/server";

export async function deleteSheet(sheetId: string) {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data, error } = await supabase.from("sheets").delete().eq("id", sheetId);

	if (error) {
		return error.message;
	} else {
		return true;
	}
}
