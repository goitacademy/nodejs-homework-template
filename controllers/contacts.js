import { addContact, getContactById, listContacts, removeContact, updateContact } from "../models/contacts.js";

export const listContactsController = async (req, res, next) => {
	try {
		const list = await listContacts()
		res.json(list)
	} catch (error) {
		next(error)
	}
}

export const getContactByIdController = async (req, res, next) => {
	try {
		const contact = await getContactById(req.params.contactId)
		if (!contact) {
			throw HttpError(404, "Contact not found")
		}
		res.json(contact)
	} catch (error) {
		next(error);
	}
}

export const addContactController = async (req, res, next) => {
	try {
		const contact = await addContact(req.body);
		res.status(201).json(contact)
	} catch (error) {
		next(error)
	}
}

export const removeContactController = async (req, res, next) => {
	try {
		const contact = await removeContact(req.params.contactId);
		if (!contact) {
			throw HttpError(404, "Contact not found")
		}
		res.json({ "message": "contact deleted" })
	} catch (error) {
		next(error)
	}
}