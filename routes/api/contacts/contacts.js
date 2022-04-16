const express = require("express");
const guard = require("../../../middleware/guard.js");
const router = express.Router();

const {
  listContactsControl,
  getByIdContactControl,
  postAddContactControl,
  removeContactControl,
  updateContactControl,
} = require("../../../controllers/contacts/index");

const { validateBody } = require("../../../middleware/validation");
const {
  schemaCreateContact,
} = require("../../../schemas/contacts-validation-schems");

const { getlistContacts } = listContactsControl;
const { getByIdContact } = getByIdContactControl;
const { postAddContact } = postAddContactControl;

const { delRemoveContact } = removeContactControl;
const { putUpdateContact } = updateContactControl;

router.get("/", guard, getlistContacts);

router.get("/:contactId", guard, getByIdContact);

router.post("/", guard, [validateBody(schemaCreateContact)], postAddContact);

router.delete("/:contactId", guard, delRemoveContact);

router.put("/:contactId", guard, putUpdateContact);

module.exports = router;
