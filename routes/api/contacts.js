const express = require("express");

const ctrl = require("../../controlers");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { schemasContact } = require("../../models");

const router = express.Router();

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post(
  "/",
  authenticate,
  validateBody(schemasContact.addSchema),
  ctrl.addContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemasContact.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemasContact.updateFavoriteSchrma),
  ctrl.updateFavorite
);

module.exports = router;
