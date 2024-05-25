import type { Database } from "@/types/supabase.types";
import Link from "next/link";

export const SheetCard = ({ sheet }: { sheet: Database["public"]["Tables"]["sheets"]["Row"] }) => {
	return (
		<li className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white shadow">
			<div className="flex grow flex-col p-6 gap-2 min-h-64">
				<h3 className="text-sm font-medium text-gray-900">{sheet.name}</h3>
				<span className="inline-flex grow rounded-md w-full max-h-64 overflow-hidden bg-gray-50 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-300/50 items-start">
					<pre>{sheet.content || "Empty file"}</pre>
				</span>
			</div>
			<div>
				<div className="-mt-px flex divide-x divide-gray-200">
					<div className="-ml-px flex w-0 flex-1">
						<Link
							href={`/${sheet.id}`}
							className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold hover:bg-gray-100 transition-colors text-gray-900"
						>
							Open
						</Link>
					</div>
				</div>
			</div>
		</li>
	);
};
