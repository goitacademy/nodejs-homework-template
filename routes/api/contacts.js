const express = require("express");
const contacts = require("../../models/contacts");
const Joi = require("joi");

const router = express.Router();

const addContactSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
});

const updateContactSchema = Joi.object({
	name: Joi.string(),
	email: Joi.string(),
	phone: Joi.string(),
}).or("name", "email", "phone");

router.get("/", async (req, res, next) => {
	try {
		const result = await contacts.listContacts();
		res.json(result);
	} catch (error) {
		res.status(500).json({
			message: "Server error",
		});
	}
});

router.get("/:contactId", async (req, res, next) => {
	const { params } = req;
	try {
		const result = await contacts.getContactById(params.contactId);
		if (result === null) {
			res.status(404).send({ message: "Not Found" });
		} else {
			res.json(result);
		}
	} catch (error) {
		res.status(500).json({
			message: "Server error",
		});
	}
});

router.post("/", async (req, res, next) => {
	const { body } = req;
	try {
		const { error } = addContactSchema.validate(body);
		if (error) {
			return res.status(406).json({ message: "Missing required field" });
		}
		const result = await contacts.addContact(body);
		res.json(result);
	} catch (error) {
		res.status(500).json({
			message: "Server error",
		});
	}
});

router.delete("/:contactId", async (req, res, next) => {
	const { params } = req;
	try {
		const result = await contacts.removeContact(params.contactId);
		if (result === null) {
			res.status(404).json({
				message: "Not Found",
			});
		} else {
			res.json(result);
		}
	} catch (error) {
		res.status(500).json({
			message: "Server error",
		});
	}
});

router.put("/:contactId", async (req, res, next) => {
	const {
		body,
		params: { contactId },
	} = req;
	try {
		const { error } = updateContactSchema.validate(body);
		if (error) {
			return res.status(406).json({ message: "Missing required field" });
		}
		const result = await contacts.updateContact(contactId, body);
		if (result === null) {
			return res.json({ message: "Not Found" });
		}
		res.json(result);
	} catch (error) {
		res.status(500).json({
			message: "Server error",
		});
	}
});

module.exports = router;
