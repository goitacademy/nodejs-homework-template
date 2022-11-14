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
	// try {
	// 	const contacts = await listContacts();
	// 	res.status(200).json({ contacts });
	// } catch (err) {
	// 	res.status(500).json({ error: err.message });
	// }
	const contacts = await listContacts();
	res.json({ contacts });
});

router.get("/:contactId", async (req, res) => {
	try {
		const { contactId } = req.params;
		const contact = await getContactById(contactId);

		if (!contact) {
			res.status(404).json({ message: "Not found" });
			return;
		}
		res.status(200).json({ contact });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post("/", validation, async (req, res) => {
	try {
		const contact = await addContact(req.body);
		res.status(201).json({ contact });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.delete("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const deletedContact = await removeContact(contactId);
		deletedContact
			? res.status(200).json({ message: "contact deleted" })
			: res.status(404).json({ message: "Not found" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.put("/:contactId", validationPUT, async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const changedContact = await updateContact(contactId, req.body);
		if (changedContact) {
			return res.status(200).json({ changedContact });
		} else {
			return res.status(404).json({ message: "Not found" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
