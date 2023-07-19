import contactsService from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAll = async (_, res) => {
	const result = await contactsService.listContacts();
	res.json(result);
};
const getBiId = async (req, res) => {
	const { id } = req.params;
	const result = await contactsService.getContactById(id);
	if (!result) {
		throw HttpError(404, `Contact with id=${id} not found`);
	}
	res.json(result);
};
const add = async (req, res) => {
	const result = await contactsService.addContact(req.body);
	res.status(201).json(result);
};
const updateBiId = async (req, res) => {
	const { id } = req.params;
	const result = await contactsService.updateContactById(id, req.body);
	if (!result) {
		throw HttpError(404, `Contact with id=${id} not found`);
	}
	res.json(result);
};
const deleteBiId = async (req, res) => {
	const { id } = req.params;
	const result = await contactsService.removeContact(id);
	if (!result) {
		throw HttpError(404, `Contact with id=${id} not found`);
	}
	res.status(200).json({ message: "Contact deleted" });
};
export default {
	getAll: ctrlWrapper(getAll),
	getBiId: ctrlWrapper(getBiId),
	add: ctrlWrapper(add),
	updateBiId: ctrlWrapper(updateBiId),
	deleteBiId: ctrlWrapper(deleteBiId),
};
