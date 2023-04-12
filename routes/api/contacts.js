const express = require("express");
const Joi = require("joi");

const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const router = express.Router();

const addShema = Joi.object({
	name: Joi.string().min(3).required().messages({
		"any.required": `"name" is required`,
	}),
	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
		.required()
		.messages({
			"any.required": `"email" is required`,
		}),
	phone: Joi.string().required().messages({
		"any.required": `"email" is required`,
	}),
});

router.get("/", async (req, res, next) => {
	try {
		const result = await contacts.listContacts();
		res.json(result);
	} catch (error) {
		next(error);
	}
});

router.get("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const result = await contacts.getContactById(contactId);
		if (!result) {
			throw HttpError(404, `Contact with ${contactId} not found`);
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const { error } = addShema.validate(req.body);
		if (error) {
			throw HttpError(400, error.message);
		}
		const result = await contacts.addContact(req.body);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
});

router.delete("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const result = await contacts.removeContact(contactId);
		if (!result) {
			throw HttpError(404, `Contact with ${contactId} not found`);
		}
		res.status(200).json({ message: "contact deleted" });
	} catch (error) {
		next(error);
	}
});

router.put("/:contactId", async (req, res, next) => {
	try {
		const { error } = addShema.validate(req.body);
		if (error) {
			throw HttpError(400, error.message);
		}
		const { contactId } = req.params;
		const result = await contacts.updateContact(contactId, req.body);
		if (!result) {
			throw HttpError(404, `Contact with ${contactId} not found`);
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
