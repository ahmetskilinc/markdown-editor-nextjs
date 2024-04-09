"use client";

import DeleteSheetModal from "@/components/Modals/DeleteSheet";
import NewSheetModal from "@/components/Modals/NewSheet";
import React, { createContext, useContext, useState } from "react";
type ModalContextType = {
	openModal: (modalSlug: string) => void;
	closeModal: () => void;
	currentModal: string | null;
};

const ModalContext = createContext<ModalContextType>({
	openModal: () => {},
	closeModal: () => {},
	currentModal: null,
});

export const ModalProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [currentModal, setCurrentModal] = useState<string | null>(null);

	const closeModal = () => {
		setCurrentModal(null);
	};

	const openModal = (modalSlug: string) => {
		setCurrentModal(modalSlug);
	};

	return (
		<ModalContext.Provider
			value={{
				openModal,
				closeModal,
				currentModal,
			}}
		>
			{children}
			<NewSheetModal />
			<DeleteSheetModal />
		</ModalContext.Provider>
	);
};

export const useModal = () => useContext(ModalContext);
