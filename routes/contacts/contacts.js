const express = require("express");
const router = express.Router();
const {
  getContacts,
  gatContact,
  createContact,
  deleteContact,
  changeContact,
  changeStatusContact,
} = require("../../controllers/contacts");

const { validateContact, validateId } = require("./validation");

const guard = require("../../helpers/guard");

const wrapError = require("../../helpers/errorHandler");

router.get("/", guard, wrapError(getContacts));

router.get("/:contactId", guard, validateId, wrapError(gatContact));

router.post("/", guard, validateContact, wrapError(createContact));

router.delete("/:contactId", guard, validateId, wrapError(deleteContact));

router.put(
  "/:contactId",
  guard,
  [validateId, validateContact],
  wrapError(changeContact)
);

router.patch(
  "/:contactId/favorite",
  guard,
  [validateId, validateContact],
  wrapError(changeStatusContact)
);

module.exports = router;
