import Contact from "../models/contact.js";
import { HttpError } from "../helpers/index.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAll = async (_, res) => {
	const result = await Contact.find({}, "-createdAt -updatedAt");
	res.json(result);
};
const getBiId = async (req, res) => {
	const { id } = req.params;
	const result = await Contact.findById(id);
	if (!result) {
		throw HttpError(404, `Contact with id=${id} not found`);
	}
	res.json(result);
};
const add = async (req, res) => {
	const result = await Contact.create(req.body);
	res.status(201).json(result);
};
const updateBiId = async (req, res) => {
	const { id } = req.params;
	const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
	if (!result) {
		throw HttpError(404, `Contact with id=${id} not found`);
	}
	res.json(result);
};
const updateStatusContact = async (req, res) => {
	const { id } = req.params;
	const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
	if (!result) {
		throw HttpError(404, `Contact with id=${id} not found`);
	}
	res.json(result);
};
const deleteBiId = async (req, res) => {
	const { id } = req.params;
	const result = await Contact.findByIdAndDelete(id);
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
	updateStatusContact: ctrlWrapper(updateStatusContact),
	deleteBiId: ctrlWrapper(deleteBiId),
};
