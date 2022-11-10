const express = require("express");
const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
} = require("../../models/contacts");

const { validation, validationPUT } = require("../../middlewares/validation");

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const contacts = await listContacts();
		res.status(200).json({ message: "success", code: 200, contacts });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.get("/:contactId", async (req, res) => {
	try {
		const { contactId } = req.params;
		const contact = await getContactById(contactId);

		if (!contact) {
			res.status(404).json({ message: "Not found" });
			return;
		}
		res.status(200).json({ message: "success", contact });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post("/", validation, async (req, res) => {
	try {
		const { name, email, phone } = req.body;
		if (!name || !email || !phone) {
			res.status(400).json({ message: "missing required name field" });
			return;
		}
		const contact = await addContact(req.body);
		res.status(201).json({ message: "success", contact });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.delete("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const deletedContact = await removeContact(contactId);
		console.log(deletedContact);
		deletedContact
			? res.status(200).json({ message: "success, contact is deleted" })
			: res.status(404).json({ message: "Not found" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.put("/:contactId", validationPUT, async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const { email, name, phone } = req.body;
		if (name || email || phone) {
			const changeContacts = await updateContact(contactId, req.body);
			if (changeContacts) {
				return res.status(200).json({ message: changeContacts });
			} else {
				return res.status(404).json({ message: "Not found" });
			}
		} else {
			return res.status(400).json({ message: "missing fields" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
