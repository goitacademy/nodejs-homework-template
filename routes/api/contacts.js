const express = require("express");

const ctrl = require("../../controlers/contacts");

const {
  validateBody,
  isValidId,
  validateBodyFavorite,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", isValidId, validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBodyFavorite(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
