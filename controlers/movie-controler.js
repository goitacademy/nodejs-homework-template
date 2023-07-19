import { listContacts, getContactById, addContact, removeContact, updateContact } from "../models/contacts.js";

import HTTPError from "../helpers/HTTPError.js";
import userAddSchema from "../schemas/schemas.js";

const getAllCobtactsCtrl = async (_, res, next) => {
	try {
		const contacts = await listContacts();
		res.json(contacts);
	} catch (e) {
		next(e);
	}
};

const findContactByIdCtrl = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const contact = await getContactById(contactId);

		if (!contact) {
			throw HTTPError(404, `Movie with id '${contactId}' not found!`);
		}
		res.json(contact);
	} catch (e) {
		next(e);
	}
};

const addContactCtrl = async (req, res, next) => {
	try {
		const body = req.body;
		const { error } = userAddSchema.validate(body);

		if (error) {
			throw HTTPError(400, error.message);
		}

		const contact = await addContact(body);
		res.status(201).json(contact);
	} catch (e) {
		next(e);
	}
};

const putContactDataCtrl = async (req, res, next) => {
	try {
		const body = req.body;
		const { contactId } = req.params;

		const { error } = userAddSchema.validate(body);

		if (error) {
			throw HTTPError(400, error.message);
		}

		const contact = await updateContact(contactId, body);

		if (!contact) {
			throw HTTPError(404, `Movie with id '${contactId}' not found!`);
		}

		res.json(contact);
	} catch (e) {
		next(e);
	}
};

const deleteContactByIdCtrl = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const contact = await removeContact(contactId);

		if (!contact) {
			throw HTTPError(404, `Movie with id '${contactId}' not found!`);
		}

		res.json({ message: "contact deleted" });
	} catch (e) {
		next(e);
	}
};

export { getAllCobtactsCtrl, findContactByIdCtrl, addContactCtrl, putContactDataCtrl, deleteContactByIdCtrl };
