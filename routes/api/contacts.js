const express = require("express");

const ContactsController = require("../../controllers/contactsController");

const validateBody = require("../../middlewares/validateBody");
const schemaAdd = require("../../middlewares/schemas/contactsAdd");
const schemaPut = require("../../middlewares/schemas/contactsPut");
const isEmptyBody = require("../../middlewares/isEmptyBody");
const router = express.Router();

router.get("/", ContactsController.getAllContacts);

router.get("/:id", ContactsController.getById);

router.post(
	"/",
	isEmptyBody,
	validateBody(schemaAdd),
	ContactsController.addNewContact
);

router.delete("/:id", ContactsController.deleteContact);

router.put(
	"/:id",
	isEmptyBody,
	validateBody(schemaPut),
	ContactsController.updateContactById
);

module.exports = router;
