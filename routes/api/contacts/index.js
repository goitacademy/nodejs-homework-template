const express = require("express");
const router = express.Router();
const validation = require("./ validation");
const guard = require("../../../helpers/guard");

const controllers = require("../../../controllers/contacts.controller");

router.get("/", guard, controllers.getContacts);

router.get(
  "/:contactId",
  guard,
  validation.validatesGetContactById,
  controllers.getContactById
);

router.post(
  "/",
  guard,
  validation.validateAddContact,
  controllers.createContact
);

router.delete(
  "/:contactId",
  guard,
  validation.validatesRemoveContact,
  controllers.deleteContact
);

router.patch(
  "/:contactId",
  guard,
  validation.validateUpdateContact,
  controllers.updateContact
);

router.patch(
  "/:contactId/favorite",
  guard,
  validation.validatesStatusContact,
  controllers.updateFavoriteStatus
);

module.exports = router;
