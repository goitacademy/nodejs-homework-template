const express = require("express");

const router = express.Router();

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const schemas = require("../../schemas");

const ctrl = require("../../controllers");

router.get("/", authenticate, ctrl.contacts.listContacts);

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  ctrl.contacts.getContactById
);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.contacts.addContact
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  ctrl.contacts.removeContacts
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.contacts.updateContact
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.contacts.updateStatusContact
);

module.exports = router;
