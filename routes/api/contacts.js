const express = require("express");
const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
	res.status(200).json(JSON.parse(await listContacts()));
});

router.get("/:contactId", async (req, res, next) => {
	const { contactId } = req.params;
	const id = getContactById(contactId);
	if (id === undefined) {
		return res.status(404).json({ message: "Not found" });
	} else {
		return res.status(200).json(await id);
	}
});

router.post("/", async (req, res, next) => {
	const { name, email, phone } = req.body;
	const newContact = addContact(name, email, phone);
	res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
	const { contactId } = req.params;
	const id = removeContact(contactId);
	if (id === undefined) {
		return res.status(404).json({ message: "Not found" });
	} else {
		return res.status(200).json({ message: "contact deleted" });
	}
});

router.put("/:contactId", async (req, res, next) => {
	const { contactId } = req.params;

	res.json({ message: "template message" });
});

module.exports = router;
