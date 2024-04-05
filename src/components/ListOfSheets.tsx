import UploadSheet from "./UploadSheet";
import MySheets from "./Common/MySheets";

export const ListOfSheets = async () => {
	return (
		<div>
			<UploadSheet />
			<div>
				<p className="mt-4 mb-2">Your locally saved sheets</p>
			</div>
			<div>
				<MySheets />
			</div>
		</div>
	);
};
