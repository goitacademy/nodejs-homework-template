const express = require("express");
const contactsModel = require("../../models/contacts");

const router = express.Router();

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
		const { name, email, phone } = req.body;

		if (!name || !email || !phone) {
			res.status(400).json({ message: "Missing required fields" });
			return;
		}

		const newContact = await contactsModel.addContact({ name, email, phone });
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
		const contactId = req.params.contactId;
		const { name, email, phone } = req.body;

		if (!name && !email && !phone) {
			res.status(400).json({ message: "Missing fields" });
			return;
		}

		const updatedContact = await contactsModel.updateContact(contactId, {
			name,
			email,
			phone,
		});

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
