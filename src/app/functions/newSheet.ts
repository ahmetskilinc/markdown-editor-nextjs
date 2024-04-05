"use server";

import { createClient } from "../utils/server";

export async function newSheet(formData: { fileName: string }) {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data, error } = await supabase
		.from("sheets")
		.insert({
			name: formData.fileName,
		})
		.select()
		.order("created_at", {
			ascending: true,
		});

	if (error) {
		return error.message;
	}

	return data[0];
}
