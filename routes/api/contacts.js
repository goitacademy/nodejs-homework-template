const functions = require("../../models/contacts");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
	res.send(await functions.listContacts());
});

router.get("/:contactId", async (req, res, next) => {
	const id = req.params.contactId;
	return res.send(await functions.getContactById(id));
});

router.post("/", async (req, res, next) => {
	const body = req.body;
	return res.send(await functions.addContact(body));
});

router.delete("/:contactId", async (req, res, next) => {
	const id = req.params.contactId;
	return res.send(await functions.removeContact(id));
});

router.put("/:contactId", async (req, res, next) => {
	const body = req.body;
	const id = req.params.contactId;
	return res.send(await functions.updateContact(id, body));
});

module.exports = router;
