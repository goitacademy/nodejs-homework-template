const express = require("express");
const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
	updateStatusContact,
} = require("../../models/contacts");

const {
	validation,
	validationPUT,
	validationFavorite,
} = require("../../middlewares/validation");

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const contacts = await listContacts();
		res.json({ contacts });
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
		res.json({ contact });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post("/", validation, async (req, res) => {
	try {
		const contact = await addContact(req.body);
		res.json({ contact });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.delete("/:contactId", async (req, res) => {
	try {
		const { contactId } = req.params;
		const deletedContact = await removeContact(contactId);
		deletedContact
			? res.json({ message: "contact deleted" })
			: res.status(404).json({ message: "Not found" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.put("/:contactId", validationPUT, async (req, res) => {
	try {
		const { contactId } = req.params;
		const changedContact = await updateContact(contactId, req.body);
		if (changedContact) {
			return res.json({ changedContact });
		} else {
			return res.status(404).json({ message: "Not found" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.patch("/:contactId/favorite", validationFavorite, async (req, res) => {
	try {
		const { contactId } = req.params;
		const updatedContact = await updateStatusContact(contactId, req.body);
		if (updatedContact) {
			return res.json({ updatedContact });
		} else {
			return res.status(404).json({ message: "Not found" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});
module.exports = router;
