const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  getOneContact,
  addNewContact,
  deleteContact,
  changeContact,
} = require("../../controllers/contacts-controllers");

const {
  validateAddContact,
  validateChangeContact,
} = require("../../utils/validateBody");
const {
  addContactSchema,
  editContactSchema,
} = require("../../schemas/contactsSchemas");

router.get("/", getAllContacts);

router.get("/:contactId", getOneContact);

router.post("/", validateAddContact(addContactSchema), addNewContact);

router.delete("/:contactId", deleteContact);

router.put(
  "/:contactId",
  validateChangeContact(editContactSchema),
  changeContact
);

module.exports = router;
