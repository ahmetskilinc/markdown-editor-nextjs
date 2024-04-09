"use client";

import { useModal } from "@/providers/ModalProvider";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { deleteSheet } from "../../app/functions/deleteSheet";
import { usePathname } from "next/navigation";

const DeleteSheetModal = () => {
	const modalSlug = "delete-sheet";
	const router = useRouter();
	const { currentModal, closeModal } = useModal();
	const pathname = usePathname();

	const segments = pathname.split("/");
	const sheetId = segments.length > 1 ? segments[1] : null;

	return (
		<Transition appear show={currentModal === modalSlug} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={closeModal}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className="mb-6 text-lg font-medium leading-6 text-gray-900"
								>
									Are you sure you want to delete this sheet?
								</Dialog.Title>
								<div>
									<div className="w-full inline-flex gap-2 items-center justify-between">
										<button
											className="shadow rounded-md bg-red-600 px-6 py-2 text-sm font-normal text-white hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full whitespace-nowrap"
											type="button"
											onClick={() => {
												deleteSheet(sheetId!);
												closeModal();
												router.push("/");
											}}
										>
											Yes, delete now.
										</button>
										<button
											className="shadow rounded-md bg-green-600 px-6 py-2 text-sm font-normal text-white hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
											type="button"
											onClick={closeModal}
										>
											Cancel
										</button>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default DeleteSheetModal;
