const express = require("express");
const router = express.Router();
const contactsAddSchema = require("../../schemas/contacts");
const { validateContactsBody } = require("../../middlewares");
const {
	getAll,
	getContactById,
	addContact,
	removeContact,
	updateContact,
 } = require("../../controllers/contacts");


router.get("/", getAll);
router.get("/:contactId", getContactById);
router.post("/", validateContactsBody(contactsAddSchema), addContact);
router.delete("/:contactId", removeContact);
router.put("/:contactId", validateContactsBody(contactsAddSchema),
   updateContact
);


module.exports = router;
