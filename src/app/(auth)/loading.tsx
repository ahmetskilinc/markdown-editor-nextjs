import { MoonLoader } from "react-spinners";

export default function Loading() {
	return (
		<div className="w-full flex justify-center pt-10">
			<MoonLoader size={28} color="#4f46e5" loading={true} />
		</div>
	);
}
