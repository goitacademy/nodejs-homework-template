const express = require("express");

const ctrl = require("../../controllers");

const schemas = require("../../schemas");

const router = express.Router();

const { isValidId, validateBody, authenticate } = require("../../middlewares");

router.get("/", authenticate, ctrl.contacts.listContacts);

// filterContacts
// router.get("/", authenticate, ctrl.contacts.filterContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.contacts.getById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.contactSchemas.addContactSchema),
  ctrl.contacts.addContact
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  ctrl.contacts.removeContact
);

router.put(
  "/:contactId",
  isValidId,
  authenticate,
  validateBody(schemas.contactSchemas.addContactSchema),
  ctrl.contacts.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  authenticate,
  validateBody(schemas.contactSchemas.updateFavoriteContactSchema),
  ctrl.contacts.updateStatusContact
);

module.exports = router;
