const express = require("express");

const router = express.Router();

const {
	getContactsList,
	getContactById,
	addContact,
	deleteContactById,
	updateContactById,
} = require("../../controllers/contactsControllers");

const {
	validateContactId,
	validateContact,
	validateUpdateContact,
} = require("./validation.js");

router.get("/", getContactsList);

router.get("/:contactId", validateContactId, getContactById);

router.post("/", validateContact, addContact);

router.delete("/:contactId", validateContactId, deleteContactById);

router.put(
	"/:contactId",
	validateContactId,
	validateUpdateContact,
	updateContactById
);

module.exports = router;
