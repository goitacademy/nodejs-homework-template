const express = require("express");

const ContactsController = require("../../controllers/contactsController");

const validateBody = require("../../middlewares/validateBody");
const schema = require("../../middlewares/schemas/contacts");
const isEmptyBody = require("../../middlewares/isEmptyBody");
const router = express.Router();

router.get("/", ContactsController.getAllContacts);

router.get("/:id", ContactsController.getById);

router.post(
	"/",
	isEmptyBody,
	validateBody(schema),
	ContactsController.addNewContact
);

router.delete("/:id", ContactsController.deleteContact);

router.put("/:id", isEmptyBody, ContactsController.updateContactById);

module.exports = router;
