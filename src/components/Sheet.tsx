import React from "react";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import rehypeRaw from "rehype-raw";
import gfm from "remark-gfm";

export interface Sheet {
	id: string;
	created_at: string;
	content: string;
	name: string;
}

const Sheet = ({ sheet }: { sheet: Sheet }) => {
	return (
		<li className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white shadow">
			<div className="flex flex-1 flex-col p-6">
				<h3 className="text-sm font-medium text-gray-900">{sheet.name}</h3>
				<dl className="mt-1 flex flex-grow flex-col justify-between">
					<dd className="mt-3">
						created at: {moment(sheet.created_at).format("hh:mm DD/MM/YY")}
						<span className="inline-flex items-center rounded-md w-full max-h-64 overflow-hidden bg-gray-50 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-600/20">
							<pre>{sheet.content}</pre>
							{/* <ReactMarkdown
								className={`h-full overflow-scroll prose prose-sm max-w-full`}
								rehypePlugins={[rehypeRaw]}
								remarkPlugins={[gfm]}
							>
							</ReactMarkdown> */}
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
