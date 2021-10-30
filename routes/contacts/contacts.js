const express = require("express");
const router = express.Router();
const {
  validateContact,
  validateIdContact,
  validateStatusContact,
} = require("./validation");
const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  updateStatusFavoriteContact,
} = require("../../controllers/contacts");
const guard = require("../../helpers/guard");
const wrapError = require("../../helpers/errorhendler");

router.get("/", guard, wrapError(getContacts));

router.get("/:contactId", guard, validateIdContact, wrapError(getContact));

router.post("/", guard, validateContact, wrapError(createContact));

router.delete(
  "/:contactId",
  guard,
  validateIdContact,
  wrapError(deleteContact)
);

router.put(
  "/:contactId",
  guard,
  [validateIdContact, validateContact],
  wrapError(updateContact)
);

router.patch(
  "/:contactId/favorite",
  guard,
  [validateIdContact, validateStatusContact],
  wrapError(updateStatusFavoriteContact)
);

module.exports = router;
