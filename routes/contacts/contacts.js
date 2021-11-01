const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  removeContact,
  updateStatusContact,
  onlySubPro,
  onlySubBusiness,
} = require("../../controllers/contacts.js");

const {
  validateContact,
  validateStatusContact,
  validateId,
} = require("./validation");

const guard = require("../../helpers/guard");
const wrapError = require("../../helpers/errorHandler");
const role = require("../../helpers/role");
const { Subscription } = require("../../config/constans");

router.get("/", guard, wrapError(getContacts));
router.get("/pro", guard, role(Subscription.PRO), onlySubPro);
router.get("/bussiness", guard, role(Subscription.BUSINESS), onlySubBusiness);

router.get("/:contactId", guard, validateId, wrapError(getContact));

router.put(
  "/:contactId",
  guard,
  [validateId, validateContact],
  wrapError(updateContact)
);

router.post("/", guard, validateContact, wrapError(createContact));

router.delete("/:contactId", guard, validateId, wrapError(removeContact));

router.patch(
  "/:contactId/favorite/",
  guard,
  [validateId, validateStatusContact],
  wrapError(updateStatusContact)
);

module.exports = router;
