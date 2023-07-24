import { listContacts, getContactById, addContact, removeContact, updateContact } from "../models/contacts.js";

import trycatchWrapper from "../decorators/trycatchWrapper.js";

const getAllContactsCtrl = async (_, res, __) => {
	const contacts = await listContacts();
	res.json(contacts);
};

const findContactByIdCtrl = async (req, res, __) => {
	const { contactId } = req.params;
	const contact = await getContactById(contactId);

	if (!contact) {
		throw HTTPError(404, `Movie with id '${contactId}' not found!`);
	}
	res.json(contact);
};

const addContactCtrl = async (req, res, __) => {
	const contact = await addContact(req.body);
	res.status(201).json(contact);
};

const putContactDataCtrl = async (req, res, __) => {
	const { contactId } = req.params;

	const contact = await updateContact(contactId, req.body);

	if (!contact) {
		throw HTTPError(404, `Movie with id '${contactId}' not found!`);
	}

	res.json(contact);
};

const deleteContactByIdCtrl = async (req, res, __) => {
	const { contactId } = req.params;
	const contact = await removeContact(contactId);

	if (!contact) {
		throw HTTPError(404, `Movie with id '${contactId}' not found!`);
	}

	res.json({ message: "contact deleted" });
};

export default {
	getAllContactsCtrl: trycatchWrapper(getAllContactsCtrl),
	findContactByIdCtrl: trycatchWrapper(findContactByIdCtrl),
	putContactDataCtrl: trycatchWrapper(putContactDataCtrl),
	deleteContactByIdCtrl: trycatchWrapper(deleteContactByIdCtrl),
	addContactCtrl: trycatchWrapper(addContactCtrl),
};
