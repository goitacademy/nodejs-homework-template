const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateFavorite,
  validateMongoId,
} = require("./validation");

router.get("/", ctrl.listContacts);

router.get("/:contactId", validateMongoId, ctrl.getContactById);

router.post("/", validationCreateContact, ctrl.addContact);

router.delete("/:contactId", validateMongoId, ctrl.removeContact);

router.put(
  "/:contactId",
  validateMongoId,
  validationUpdateContact,
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  validateMongoId,
  validationUpdateFavorite,
  ctrl.updateContact
);

module.exports = router;
