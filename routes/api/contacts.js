const express = require("express");
const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const contacts = await listContacts();
		res.status(200).json({ message: "success", code: 200, contacts });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.get("/:contactId", async (req, res, next) => {
	res.json({ message: "template message" });
});

router.post("/", async (req, res, next) => {
	res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
	res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
	res.json({ message: "template message" });
});

module.exports = router;
