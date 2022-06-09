const express = require("express");
const guard = require("../../../middleware/guard.js");
const router = express.Router();

const { wrapper: wrapperError } = require("../../../middleware/error-handler");

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

router.get("/", guard, wrapperError(getlistContacts));

router.get("/:contactId", guard, wrapperError(getByIdContact));

router.post(
  "/",
  guard,
  [validateBody(schemaCreateContact)],
  wrapperError(postAddContact)
);

router.delete("/:contactId", guard, wrapperError(delRemoveContact));

router.put("/:contactId", guard, wrapperError(putUpdateContact));

module.exports = router;
