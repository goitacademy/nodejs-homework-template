const express = require("express");
const router = express.Router();
const ctrl = require("../../../controllers/contacts");
const guard = require("../../../helpers/guard");

const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateFavorite,
  validateMongoId,
} = require("./validation");

router.get("/", guard, ctrl.listContacts);

router.get("/:contactId", guard, validateMongoId, ctrl.getContactById);

router.post("/", guard, validationCreateContact, ctrl.addContact);

router.delete("/:contactId", guard, validateMongoId, ctrl.removeContact);

router.put(
  "/:contactId",
  guard,
  validateMongoId,
  validationUpdateContact,
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  guard,
  validateMongoId,
  validationUpdateFavorite,
  ctrl.updateContact
);

module.exports = router;
