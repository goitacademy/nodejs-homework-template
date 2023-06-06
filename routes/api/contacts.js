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
	console.log(body);
	res.send(await functions.addContact(body));
});

router.delete("/:contactId", async (req, res, next) => {
	res.json({ message: "delete message" });
});

router.put("/:contactId", async (req, res, next) => {
	res.json({ message: "put message" });
});

module.exports = router;
