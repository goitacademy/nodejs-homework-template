const express = require("express");
const Joi = require("joi");
const contactsModel = require("../../models/contacts");

const router = express.Router();

const contactSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
	try {
		const contacts = await contactsModel.listContacts();
		res.json(contacts);
	} catch (error) {
		next(error);
	}
});

router.get("/:contactId", async (req, res, next) => {
	try {
		const contactId = req.params.contactId;
		const contact = await contactsModel.getContactById(contactId);

		if (contact) {
			res.json(contact);
		} else {
			res.status(404).json({ message: "Not found" });
		}
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const { error } = contactSchema.validate(req.body);

		if (error) {
			res.status(400).json({ message: error.details[0].message });
			return;
		}

		const newContact = await contactsModel.addContact(req.body);
		res.status(201).json(newContact);
	} catch (error) {
		next(error);
	}
});

router.delete("/:contactId", async (req, res, next) => {
	try {
		const contactId = req.params.contactId;
		const contact = await contactsModel.getContactById(contactId);

		if (contact) {
			await contactsModel.removeContact(contactId);
			res.json({ message: "Contact deleted" });
		} else {
			res.status(404).json({ message: "Not found" });
		}
	} catch (error) {
		next(error);
	}
});

router.put("/:contactId", async (req, res, next) => {
	try {
		const { error } = contactSchema.validate(req.body);

		if (error) {
			res.status(400).json({ message: error.details[0].message });
			return;
		}

		const contactId = req.params.contactId;
		const updatedContact = await contactsModel.updateContact(
			contactId,
			req.body
		);

		if (updatedContact) {
			res.json(updatedContact);
		} else {
			res.status(404).json({ message: "Not found" });
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
