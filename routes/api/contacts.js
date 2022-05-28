const express = require("express");
const Joi = require("joi");
const contacts = require("../../models/contacts");
const { createError } = require("../../error");
const router = express.Router();

const schemaAdd = Joi.object({
	name: Joi.string().min(2).max(20).required(),
	email: Joi.string().email().required(),
	phone: Joi.string()
		.pattern(/^[0-9]+$/)
		.required(),
});
const schemaUpdate = Joi.object({
	name: Joi.string().min(2).max(20),
	email: Joi.string().email(),
	phone: Joi.string().pattern(/^[0-9]+$/),
}).min(1);

router.get("/", async (req, res, next) => {
	try {
		const allContacts = await contacts.listContacts();
		res.status(200).json(allContacts);
	} catch (error) {
		next(error);
	}
});

router.get("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const contactById = await contacts.getContactById(contactId);
		if (!contactById) {
			throw createError(404, "Not found");
		}
		res.status(200).json(contactById);
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const { error } = schemaAdd.validate(req.body);
		if (error) {
			throw createError(400, "missing required name field");
		}
		const newContact = await contacts.addContact(req.body);
		res.status(201).json(newContact);
	} catch (error) {
		next(error);
	}
});

router.put("/:contactId", async (req, res, next) => {
	try {
		const { error } = schemaUpdate.validate(req.body);
		if (error) {
			throw createError(400, "missing fields");
		}
		const { contactId } = req.params;
		const updatedContact = await contacts.updateContact(contactId, req.body);
		if (!updatedContact) {
			throw createError(404, "Not found");
		}
		res.status(201).json(updatedContact);
	} catch (error) {
		next(error);
	}
});

router.delete("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const removeContactById = await contacts.removeContact(contactId);
		if (!removeContactById) {
			throw createError(404, "Not found");
		} else {
			res.status(200).json({ message: "contact deleted" });
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
