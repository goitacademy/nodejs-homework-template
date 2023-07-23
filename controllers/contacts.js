import HttpError from "../helpers/HttpError.js";
import { Contact } from "../models/contacts.js";
import { ctrlWrapper } from '../decorators/index.js'

export const listContactsController = ctrlWrapper(async (req, res) => {
	const list = await Contact.find();
	res.json(list)
})

export const getContactByIdController = ctrlWrapper(async (req, res) => {
	const contact = await Contact.findById(req.params.contactId)
	if (!contact) {
		throw HttpError(404, "Not found")
	}
	res.json(contact)
})

export const addContactController = ctrlWrapper(async (req, res) => {
	const contact = await Contact.create(req.body);
	res.status(201).json(contact)
})

export const removeContactController = ctrlWrapper(async (req, res) => {
	const contact = await Contact.findByIdAndRemove(req.params.contactId);
	if (!contact) {
		throw HttpError(404, "Not found")
	}
	res.json({ "message": "contact deleted" })
})

export const updateContactController = ctrlWrapper(async (req, res) => {
	const contact = await Contact.findByIdAndUpdate(req.params.contactId, req.body, { new: true });
	if (!contact) {
		throw HttpError(404, "Not found")
	}
	res.json(contact)
})

export const updateContactFavoriteController = ctrlWrapper(async (req, res) => {
	const contact = await Contact.findByIdAndUpdate(req.params.contactId, req.body, { new: true });
	if (!contact) {
		throw HttpError(404, "Not found")
	}
	res.json(contact)
})