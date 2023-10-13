const express = require("express");

const router = express.Router();

const isEmptyBody = require("../../middlewares/isEmptyBody");

const validateBody = require("../../decorators/validateBody");

const contactAddSchema = require("../../schemas/contacts");

const contactAddValidate = validateBody(contactAddSchema);

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
