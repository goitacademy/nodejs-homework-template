const express = require("express");

const contacts = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  	console.log('main');

	res.json(await contacts.listContacts());
});

router.get("/:contactId", async (req, res, next) => {
  console.log(req.body)
	res.json(await contacts.getContactById(req.body.id));
});

router.post("/", async (req, res, next) => {
	res.json(await contacts.addContact(req.body));
});

router.delete("/:contactId", async (req, res, next) => {
	res.json(await contacts.removeContact(req.body.id));
});

router.put("/:contactId", async (req, res, next) => {
	res.json(await contacts.updateContact(req.body));
});

module.exports = router;
