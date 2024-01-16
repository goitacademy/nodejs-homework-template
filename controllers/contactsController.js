import Contact from "../models/contact.js";
import { HttpError } from "../helpers/index.js";

export const getAllContacts = async (req, res) => {
	const result = await Contact.find();
	res.json(result);
};

export const getById = async (req, res) => {
	const { id } = req.params;
	const result = await Contact.findById(id);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
};

export const addNewContact = async (req, res) => {
	const result = await Contact.create(req.body);
	res.status(201).json(result);
};

export const deleteContact = async (req, res) => {
	const { id } = req.params;
	const result = await Contact.findByIdAndDelete(id);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json({
		message: "contact deleted",
	});
};

export const updateContactById = async (req, res) => {
	const { id } = req.params;
	const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

	if (!result) {
		throw HttpError(404, `Not found`);
	}
	res.json(result);
};

export const updateStatusContact = async (req, res) => {
	const { id } = req.params;
	const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

	if (!result) {
		throw HttpError(404, `Not found`);
	}
	res.json(result);
};
