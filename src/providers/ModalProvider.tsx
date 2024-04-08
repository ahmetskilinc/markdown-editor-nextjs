"use client";

import NewSheet from "@/components/Modals/NewSheet";
import React, { createContext, useContext, useState } from "react";
type ModalContextType = {
	toggleModal: () => void;
	isOpen: boolean;
};

const ModalContext = createContext<ModalContextType>({
	toggleModal: () => {},
	isOpen: false,
});

export const ModalProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleModal = () => {
		setIsOpen(!isOpen);
	};

	return (
		<ModalContext.Provider
			value={{
				toggleModal,
				isOpen,
			}}
		>
			{children}
			<NewSheet />
		</ModalContext.Provider>
	);
};

export const useModal = () => useContext(ModalContext);
