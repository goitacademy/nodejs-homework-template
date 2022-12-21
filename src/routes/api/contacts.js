const express = require("express");
const router = express.Router();
const { getContacts, getContactId, deleteContact, postContact, putContact } = require("../../controllers/contactsController.js");
const { createContactSchema } = require("../../middlewares/contactSchema");
const validateSchema = require("../../middlewares/validateSchemaRequest");

router.get("/", getContacts);
router.get("/:contactId", getContactId);
router.post("/", validateSchema(createContactSchema), postContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", putContact);

module.exports = router;
