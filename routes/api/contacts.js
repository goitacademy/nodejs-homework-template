const express = require("express");

const contacts = require("../../models/contacts");

const Joi = require("joi");

const addSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.number().required(),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
	try {
		const result = await contacts.listContacts();
		res.json(result);
	} catch (err) {
		next(err);
	}
});

router.get("/:contactId", async (req, res, next) => {
	try {
		const {contactId} = req.params;
		const result = await contacts.getContactById(contactId);
		res.json(result);
	} catch (err) {
		next(err);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const {error} = addSchema.validate(req.body);
		if (error) throw new Error("hahaha");
		const result = await contacts.addContact(req.body);
		res.json(result);
	} catch (err) {
		next(err);
	}
});

router.delete("/:contactId", async (req, res, next) => {
	try {
		const {contactId} = req.params;
		const result = await contacts.removeContact(contactId);
		res.json(result);
	} catch (err) {
		next(err);
	}
});

router.put("/:contactId", async (req, res, next) => {
	try {
		const {contactId} = req.params;
		const {error} = addSchema.validate(req.body);
		if (error) throw new Error("hahaha");

		const result = await contacts.updateContact(contactId, req.body);
		res.json(result);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
