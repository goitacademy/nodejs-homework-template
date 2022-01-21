const express = require("express");
const createError = require("http-errors");
const Joi = require("joi");

const {
	getContactsList,
	getContactById,
	addContact,
	updateContact,
	removeContact,
} = require("../../models/contacts/index");

const router = express.Router();

const schema = Joi.object({
	name: Joi.string().min(2).max(30).required(),
	email: Joi.string().email().required(),
	phone: Joi.string()
		.pattern(
			/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
		)
		.required(),
});

router.get("/", async (req, res, next) => {
	try {
		const contacts = await getContactsList();
		res.json(contacts);
	} catch (error) {
		next(error);
	}
});

router.get("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const contact = await getContactById(contactId);

		if (!contact) {
			throw createError(404, `Contact  with id "${contactId}" did not found`);
		}
		res.json(contact);
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const { error } = schema.validate(req.body);
		if (error) {
			throw createError(400, error.message);
		}
		const newContact = await addContact(req.body);
		res.status(201).json(newContact);
	} catch (error) {
		next(error);
	}
});

router.put("/:contactId", async (req, res, next) => {
	try {
		const { body } = req;
		const { error } = schema.validate(body);
		if (error) {
			throw createError(400, error.message);
		}

		const { contactId } = req.params;
		const contact = await updateContact({ contactId, body });

		if (!contact) {
			throw createError(404, `Contact  with id "${contactId}" did not found`);
		}
		res.json(contact);
	} catch (error) {
		next(error);
	}
});

router.delete("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const contact = await removeContact(contactId);

		if (!contact) {
			throw createError(404, `Contact  with id "${contactId}" did not found`);
		}
		res.json({ message: "contact deleted" });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
