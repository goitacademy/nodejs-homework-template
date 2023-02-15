const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { addPostValidation } = require("../../middlewares/validationMiddleware");
const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res) => {
	const getContacts = await listContacts();
	res.status(200).json(getContacts);
});

router.get("/:contactId", async (req, res) => {
	const { contactId } = req.params;
	const getContact = await getContactById(contactId);
	if (getContact) {
		res.status(200).json(getContact);
	} else {
		res.status(404).json({ message: "Not found" });
	}
});

router.post("/", addPostValidation, async (req, res) => {
	const { name, email, phone } = req.body;
	await addContact({
		id: uuidv4(),
		name,
		email,
		phone,
	});
	res.status(201).json({ message: "new contact added" });
});

router.delete("/:contactId", async (req, res) => {
	const { contactId } = req.params;
	if (contactId) {
		await removeContact(contactId);
		res.status(200).json({ message: "contact deleted" });
	} else {
		res.status(400).json({ message: "Not found" });
	}
});

router.put("/:contactId", async (req, res, next) => {
	const { contactId } = req.params;
	const { name, email, phone } = req.body;
	if (!name || !email || !phone) {
		res.status(400).json({ message: "missing fields" });
	} else {
		const renewContact = await updateContact(contactId, {
			name,
			email,
			phone,
		});
		if (renewContact) {
			res.status(200).json({ message: "Contact Updated" });
		} else {
			res.status(404).json({ message: "Not found" });
		}
	}
});

module.exports = router;
