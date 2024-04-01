import React from "react";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import moment from "moment";
import Link from "next/link";

export interface Sheet {
	id: string;
	dateAdded: string;
	file: ArrayBuffer;
	name: string;
}

const Sheet = ({ sheet }: { sheet: Sheet }) => {
	return (
		<li
			key={sheet.id}
			className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
		>
			<div className="flex flex-1 flex-col p-6">
				<h3 className="text-sm font-medium text-gray-900">{sheet.name}</h3>
				<dl className="mt-1 flex flex-grow flex-col justify-between">
					<dd className="mt-3">
						<span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
							{moment(sheet.dateAdded).format("hh:mm DD/MM/YY")}
						</span>
					</dd>
				</dl>
			</div>
			<div>
				<div className="-mt-px flex divide-x divide-gray-200">
					<div className="-ml-px flex w-0 flex-1">
						<Link
							href={`/${sheet.id}`}
							className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
						>
							Open
						</Link>
					</div>
				</div>
			</div>
		</li>
	);
};

export default Sheet;
