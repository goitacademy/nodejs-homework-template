const express = require("express");
const { postContactsValidation, putContactsValidation } = require("../../middlewares/validationMiddleware.js");
const router = express.Router();

const {
 listContacts,
 getContactById,
 removeContact,
 addContact,
 updateContact,
} = require("../../models/contacts.js");



router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", postContactsValidation,  addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId",putContactsValidation, updateContact);

module.exports = router;
