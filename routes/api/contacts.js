const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const contacts = require("../../models/contacts");

router.get("/", async (req, res, next) => {
	try {
		const result = await contacts.listContacts();
		res.json(result);
	} catch (error) {
		res.status(500).json({
			message: "Server error!",
		});
	}
});

router.get("/:contactId", async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await contacts.getContactById(id);
		if (!result) {
			res.status(404).json({
				message: "Contact not found!",
			});
		}
		res.json(result);
	} catch (error) {
		res.status(500).json({
			message: "Server error!",
		});
	}
});

router.post("/", async (req, res, next) => {
	try {
		const { name, email, phone } = req.body;
		const result = await contacts.addContact(name, email, phone);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}

	res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await contacts.removeContact(id);
		if (!result) {
			throw new createError(404, "Contact not found!");
		}
		res.json({ message: "Contact deleted" });
	} catch (error) {
		next(error);
	}
});

router.put("/:contactId", async (req, res, next) => {
	try {
		const { error } = contactsScheme.validate(req.body);
		if (error) {
			throw new createError(400, error.message);
		}
		const { id } = req.params;
		const { name, email, phone } = req.body;
		const result = await contacts.updateContact(id, name, email, phone);
		if (!result) {
			throw new createError(404, "Contact not found!");
		}
		res.json(result);
	} catch (error) {
		next(error);
	}

	res.json({ message: "template message" });
});

module.exports = router;
