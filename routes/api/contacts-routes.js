const express = require("express");
const schemas = require("../../schemas/contacts");

const controllersContacts = require("../../controllers/contacts-controllers");
const validateBody = require("../../utils/validateBody");

const router = express.Router();

router.get("/", controllersContacts.listContacts);

router.get("/:contactId", controllersContacts.getContactById);

router.post(
  "/",
  validateBody(schemas.contactAddSchema),
  controllersContacts.addContact
);

router.put(
  "/:contactId",
  validateBody(schemas.contactAddSchema),
  controllersContacts.updateContactById
);

router.delete("/:contactId", controllersContacts.removeContact);

module.exports = router;
