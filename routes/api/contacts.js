const express = require("express");

const router = express.Router();

const isEmptyBody = require("../../middlewares/isEmptyBody");

const validateBody = require("../../decorators /validateBody");
const addSchema = require("../../schemas/contacts-schemas.js");

const contactAddValidate = validateBody(addSchema);

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contactsControllers");

router.get("/", listContacts);

router.get("/:contactId", isEmptyBody, contactAddValidate, getContactById);

router.post("/", isEmptyBody, contactAddValidate, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", updateContact);

module.exports = router;
