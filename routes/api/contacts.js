const express = require("express");

const router = express.Router();

const isEmptyBody = require("../../middlewares/isEmptyBody");

const validateBody = require("../../decorators /validateBody");

const addSchema = require("../../schemas/contacts");

const contactAddValidate = validateBody(addSchema);

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contactsControllers");

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", isEmptyBody, contactAddValidate, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", contactAddValidate, updateContact);

module.exports = router;
