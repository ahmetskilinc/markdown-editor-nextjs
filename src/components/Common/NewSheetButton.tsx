"use client";

import React from "react";
import { useModal } from "@/providers/ModalProvider";

export const NewSheet = () => {
	const { toggleModal } = useModal();
	return (
		<li className="relative col-span-1 rounded-lg flex items-center justify-center group shadow p-6 overflow-hidden">
			<button
				onClick={() => toggleModal()}
				className="absolute inset-0 inline-flex items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm sm:text-md font-semibold text-gray-900 bg-white group-hover:bg-gray-100 transition-colors"
			>
				New sheet
			</button>
		</li>
	);
};
