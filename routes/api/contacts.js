const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { validateBody,validateFavorite, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateFavorite(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:contactId", isValidId, ctrl.removeContact);

module.exports = router;
