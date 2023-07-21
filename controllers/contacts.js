import HttpError from "../helpers/HttpError.js";
import { Contact, addContact, getContactById, listContacts, removeContact, updateContact } from "../models/contacts.js";
import { ctrlWrapper } from '../decorators/index.js'

export const listContactsController = ctrlWrapper(async (req, res, next) => {
	const list = await Contact.find();
	res.json(list)
})

export const getContactByIdController = ctrlWrapper(async (req, res, next) => {
	const contact = await getContactById(req.params.contactId)
	if (!contact) {
		throw HttpError(404, "Not found")
	}
	res.json(contact)
})

export const addContactController = ctrlWrapper(async (req, res, next) => {
	const contact = await Contact.create(req.body);
	res.status(201).json(contact)
})

export const removeContactController = ctrlWrapper(async (req, res, next) => {
	const contact = await removeContact(req.params.contactId);
	if (!contact) {
		throw HttpError(404, "Not found")
	}
	res.json({ "message": "contact deleted" })
})

export const updateContactController = ctrlWrapper(async (req, res, next) => {
	const contact = await updateContact(req.params.contactId, req.body);
	if (!contact) {
		throw HttpError(404, "Not found")
	}
	res.json(contact)
})