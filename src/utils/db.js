import Localbase from "localbase";
import { v4 as uuid } from "uuid";

let db = new Localbase("db");

// check if anything in db
export const getSheetsFromDb = async () => {
	const sheets = await db.collection("files").get();
	return sheets;
};

// get a sheet from db
export const getSheetFromDb = async (id) => {
	try {
		const sheet = await db.collection("files").doc({ id: id }).get();
		return sheet;
	} catch (error) {
		console.log(error);
	}
};

// save loaded file to db
export const saveLoadedFileToDb = async (file, name) => {
	const id = uuid();
	const date = new Date();
	const newFile = {
		id: id,
		dateAdded: date.toDateString(),
		file: file,
		name: name,
	};

	await db.collection("files").add(newFile, id);
	return id;
};

// save current file to db
export const saveCurrentFileToDb = async (file, id) => {
	await db.collection("files").add({ id: id, file: file, name: name }, id);
};
