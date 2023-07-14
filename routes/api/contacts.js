import express from "express"
import { addContact, getContactById, listContacts, removeContact, updateContact } from "../../models/contacts.js";
import HttpError from "../../helpers/HttpError.js";
import Joi from "joi";

const router = express.Router();

const contactAddSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required()
})

router.get('/', async (req, res, next) => {
	try {
		const list = await listContacts()
		res.json(list)
	} catch (error) {
		next(error)
	}
})

router.get('/:contactId', async (req, res, next) => {
	try {
		const contact = await getContactById(req.params.contactId)
		if (!contact) {
			throw HttpError(404, "Contact not found")
		}
		res.json(contact)
	} catch (error) {
		next(error);
	}
})

router.post('/', async (req, res, next) => {
	try {
		const { error } = contactAddSchema.validate(req.body);
		if (error) {
			throw HttpError(400, error.message)
		}
		const contact = await addContact(req.body);
		res.status(201).json(contact)
	} catch (error) {
		next(error)
	}
})

router.delete('/:contactId', async (req, res, next) => {
	try {
		const contact = await removeContact(req.params.contactId);
		if (!contact) {
			throw HttpError(404, "Contact not found")
		}
		res.json({ "message": "contact deleted" })
	} catch (error) {
		next(error)
	}
})

router.put('/:contactId', async (req, res, next) => {
	if (Object.keys(req.body).length === 0) {
		return res.status(400).json({ "message": "missing fields" })
	}
	try {
		const { error } = contactAddSchema.validate(req.body);
		if (error) {
			throw HttpError(400, error.message)
		}
		const contact = await updateContact(req.params.contactId, req.body);
		if (!contact) {
			throw HttpError(404, "Contact not found")
		}
		res.json(contact)
	} catch (error) {
		next(error)
	}
})

export default router