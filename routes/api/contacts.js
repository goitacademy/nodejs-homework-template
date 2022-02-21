const express = require("express");
const {
  schemaCreateContact,
} = require("../../routes/api/contacts_validation_schemes");
const {
  validateBody,
} = require("../../middlewares/validation");
const {
  listContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
} = require("../../controllers/contactsController");
const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post(
  "/",
  validateBody(schemaCreateContact),
  addContact
);

router.delete("/:contactId", deleteContact);

router.put(
  "/:contactId",
  validateBody(schemaCreateContact),
  updateContact
);

module.exports = router;
