const express = require("express");
const router = express.Router();


const {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavoriteContactStatus,
} = require("../../controllers/contacts");

const {
  validateContact,
  validateContactStatus,
  validateContactId,
} = require("./validation");

const guard = require("../../helpers/guard");
const wrapError = require("../../helpers/errorHandler");
const { Subscription } = require("../../config/constants");
const role = require("../../helpers/role");

const STARTER = Subscription.STARTER;
const PRO = Subscription.PRO;
const BUSINESS = Subscription.BUSINESS;

const {
  onlyStarter,
  onlyPro,
  onlyBusiness,
} = require("../../controllers/users");

router.get("/", guard, wrapError(getContacts));

router.get(
  "/starter",
  guard,
  role(STARTER),
  wrapError(onlyStarter)
);

router.get("/pro", guard, role(PRO), wrapError(onlyPro));

router.get(
  "/business",
  guard,
  role(BUSINESS),
  wrapError(onlyBusiness)
);

router.get("/:contactId", guard, validateContactId, wrapError(getContactById));

router.post("/", guard, validateContact, wrapError(addContact));

router.delete(
  "/:contactId",
  guard,
  validateContactId,
  wrapError(removeContact)
);

router.put(
  "/:contactId",
  guard,
  [(validateContactId, validateContact)],
  wrapError(updateContact)
);

router.patch(
  "/:contactId/favorite/",
  guard,
  [(validateContactId, validateContactStatus)],
  wrapError(updateFavoriteContactStatus)
);

module.exports = router;