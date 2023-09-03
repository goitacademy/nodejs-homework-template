const express = require("express");

const ctrl = require("../../controlers/contacts");

const {
  validateBody,
  isValidId,
  validateBodyFavorite,
  authenticate,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.delete("/:contactId", isValidId, authenticate, ctrl.removeContact);

router.put(
  "/:contactId",
  isValidId,
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  authenticate,
  validateBodyFavorite(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
