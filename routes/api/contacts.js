const express = require("express");
const {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contacts");
const { validationBody } = require("../../middlewares/validationBody");
const {
  addSchema,
} = require("../../utils/validation/contactValidationSchemas");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getContactById);

router.post("/", validationBody(addSchema), addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validationBody(addSchema), updateContact);

module.exports = router;
