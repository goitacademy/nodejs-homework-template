import Contact from "../models/contact.js";

import trycatchWrapper from "../decorators/trycatchWrapper.js";
import HTTPError from "../helpers/HTTPError.js";

const getAllContactsCtrl = async (_, res) => {
	const contacts = await Contact.find();
	res.json(contacts);
};

const findContactByIdCtrl = async (req, res) => {
	const { contactId } = req.params;
	const contact = await Contact.findById(contactId);

	if (!contact) {
		throw HTTPError(404, `Movie with id '${contactId}' not found!`);
	}
	res.json(contact);
};

const addContactCtrl = async (req, res) => {
	const contact = await Contact.create(req.body);
	res.status(201).json(contact);
};

const updateByIdCtrl = async (req, res) => {
	const { contactId } = req.params;

	const contact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });

	if (!contact) {
		throw HTTPError(404, `Movie with id '${contactId}' not found!`);
	}

	res.json(contact);
};

const updateFavoriteCtrl = async (req, res) => {
	const { contactId } = req.params;

	const contact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });

	if (!contact) {
		throw HTTPError(404, `Movie with id '${contactId}' not found!`);
	}

	res.json(contact);
};

const deleteContactByIdCtrl = async (req, res) => {
	const { contactId } = req.params;
	const contact = await Contact.findByIdAndDelete(contactId);

	if (!contact) {
		throw HTTPError(404, `Movie with id '${contactId}' not found!`);
	}

	res.json({ message: "contact deleted" });
};

export default {
	getAllContactsCtrl: trycatchWrapper(getAllContactsCtrl),
	addContactCtrl: trycatchWrapper(addContactCtrl),
	findContactByIdCtrl: trycatchWrapper(findContactByIdCtrl),
	updateFavoriteCtrl: trycatchWrapper(updateFavoriteCtrl),
	updateByIdCtrl: trycatchWrapper(updateByIdCtrl),
	deleteContactByIdCtrl: trycatchWrapper(deleteContactByIdCtrl),
};
