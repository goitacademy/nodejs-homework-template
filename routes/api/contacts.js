const express = require("express");

const router = express.Router();

const {
  getAllContacts,
  getContactById,
  deleteContactById,
  updateContactById,
  addContact,
} = require("../../controllers/contacts-controllers");

const schemas = require("../../schemas/contacts-schemas");

const validateBody = require("../../decorators/validateBody");

router.get("/", getAllContacts);

router.get("/:contactId", getContactById);

router.post("/", validateBody(schemas.contactsAddSchema), addContact);

router.delete("/:contactId", deleteContactById);

router.put("/:contactId",validateBody(schemas.contactsAddSchema), updateContactById);

module.exports = router;
