const express = require("express");

const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../../controllers/contactsControllers");
const { ContactSchema } = require("../../schemas/contactsSchemas");
const validateContact = require("../../decorators/validateContact");

const router = express.Router();
router
  .route("/")
  .get(listContacts)
  .post(validateContact(ContactSchema), addContact);
router
  .route("/:contactId")
  .get(getContactById)
  .put(validateContact(ContactSchema), updateContact)
  .delete(removeContact);

module.exports = router;
