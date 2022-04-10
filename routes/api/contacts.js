const express = require("express");
const router = express.Router();

const {
  listContactsControl,
  getByIdContactControl,
  postAddContactControl,
  removeContactControl,
  updateContactControl,
} = require("../../controllers/contacts/index");

const { validateBody } = require("../../middleware/validation");
const {
  schemaCreateContact,
} = require("../../schemas/contacts-validation-schems");

const { getlistContacts } = listContactsControl;
const { getByIdContact } = getByIdContactControl;
const { postAddContact } = postAddContactControl;

const { delRemoveContact } = removeContactControl;
const { putUpdateContact } = updateContactControl;

router.get("/", getlistContacts);

router.get("/:contactId", getByIdContact);

router.post("/", [validateBody(schemaCreateContact)], postAddContact);

router.delete("/:contactId", delRemoveContact);

router.put("/:contactId", putUpdateContact);

module.exports = router;
