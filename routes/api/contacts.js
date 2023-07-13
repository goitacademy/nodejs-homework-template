const express = require("express");

const router = express.Router();

const contactsService = require("../../models/contacts");

const {HttpError} = require('../../helpers')

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsService.listContacts();
    res.json(contacts[2]);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const contact = await contactsService.getContactById(id);

		if (!contact) throw HttpError(404, 'Not found with id')
		res.json(contact);
	}
	catch (error) {
		next(error);
	}
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
