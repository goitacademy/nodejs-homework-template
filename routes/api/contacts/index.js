const express = require("express");
const router = express.Router();

const ctrls = require("../../../controllers/contacts");
const guard = require("../../../helpers/guard");

const {
  validateAddContact,
  validateUpdateContact,
  validateUpdateStatusContact,
  validateObjectId,
} = require("./validation");

router.get("/", guard, ctrls.getAll);

router.get("/:contactId", guard, validateObjectId, ctrls.getById);

router.post("/", guard, validateAddContact, ctrls.createContact);

router.delete("/:contactId", guard, validateObjectId, ctrls.removeContact);

router.put("/:contactId", guard, validateUpdateContact, ctrls.updateContact);

router.patch(
  "/:contactId/favorite",
  guard,
  validateUpdateStatusContact,
  ctrls.updateContact
);

module.exports = router;
