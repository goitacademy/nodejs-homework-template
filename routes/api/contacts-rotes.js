const express = require("express");
const router = express.Router();
const contacts = require("../../models/contacts-funcs");
const createError = require("http-errors");
const Joi = require("joi");

const contactsScheme = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email({
		minDomainSegments: 2,
		tlds: { allow: ["com", "net"] },
	}),
	phone: Joi.string().required(),
});

// GET ALL
router.get("/", async (req, res, next) => {
	try {
		const result = await contacts.listContacts();
		res.json(result);
	} catch (error) {
		next(error);
	}
});

// GET BY ID
router.get("/:contactId", async (req, res, next) => {
	try {
		console.log("req.params", req.params.contactId);
		const id = req.params.contactId;
		const result = await contacts.getContactById(id);
		if (!result) {
			throw createError(404, "Contact not found!");
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
});

// ADD
router.post("/", async (req, res, next) => {
	try {
		const { error } = contactsScheme.validate(req.body);
		if (error) {
			throw createError(400, error.message);
		}
		if (
			req.body === null ||
			req.body.name === null ||
			req.body.email === null ||
			req.body.phone === null
		) {
			res.json({ message: "missing required name field" });
		}
		const { name, email, phone } = req.body;
		const result = await contacts.addContact(name, email, phone);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
	res.json({ message: "Contact sucessfully added" });
});

// DELETE
router.delete("/:contactId", async (req, res, next) => {
	try {
		const id = req.params.contactId;
		const result = await contacts.removeContact(id);
		if (!result || !id) {
			throw createError(404, "Contact not found!");
		}
		res.json({ message: "Contact deleted" });
	} catch (error) {
		next(error);
	}
});

// UPDATE
router.put("/:contactId", async (req, res, next) => {
	try {
		const { error } = contactsScheme.validate(req.body);
		if (error) {
			throw createError(400, error.message);
		}
		const id = req.params.contactId;
		const { name, email, phone } = req.body;

		const result = await contacts.updateContact(id, name, email, phone);
		if (!result) {
			throw createError(404, "Contact not found!");
		} else if (req.body === null) {
			res.json({ message: "missing fields" });
		}
		res.json(result);
	} catch (error) {
		next(error);
	}

	res.json({ message: "Contact sucessfully updated" });
});

module.exports = router;
