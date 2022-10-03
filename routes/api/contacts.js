const express = require("express");
const Joi = require("joi");

const router = express.Router();

const addSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
});

const contactsApi = require("../../models/contacts");
const { RequestError } = require("../../utils");

router.get("/", async (req, res, next) => {
	try {
		const contacts = await contactsApi.listContacts();
		res.json(contacts);
	} catch (error) {
		next(error);
	}
});

router.get("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const contact = await contactsApi.getContactById(contactId);
		if (!contact) {
			throw RequestError(404);
		}
		res.json(contact);
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const { error } = addSchema.validate(req.body);
		if (error) throw new Error(error);
		const contact = await contactsApi.addContact(req.body);
		res.status(201).json(contact);
	} catch (error) {
		next(error);
	}
});

router.delete("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const contact = await contactsApi.removeContact(contactId);
		if (!contact) {
			throw RequestError(404);
		}
		res.status(200).json(contact);
	} catch (error) {
		next(error);
	}
});

router.put("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const { error } = addSchema.validate(req.body);
		if (error) {
			throw RequestError(400);
		}
		const contact = await contactsApi.updateContact(contactId, req.body);
		if (!contact) {
			throw RequestError(404);
		}
		res.status(201).json(contact);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
