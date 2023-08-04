const express = require("express");

const router = express.Router();

const {
  validateBody,
  isValidId,
  isValidBody,
  authenticate,
} = require("../../middelewares");

const { schemas } = require("../../models");

const { ctrlContacts } = require("../../controllers");

router.get("/", authenticate, ctrlContacts.getAll);

router.get("/:contactId", authenticate, isValidId, ctrlContacts.getById);

router.post(
  "/",
  validateBody(schemas.addSchema),
  authenticate,
  ctrlContacts.addNewContact
);

router.delete(
  "/:contactId",
  isValidId,
  authenticate,
  ctrlContacts.deleteContact
);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  authenticate,
  ctrlContacts.ubdateById
);

router.patch(
  "/:contactId",
  isValidId,
  isValidBody,
  validateBody(schemas.favotiteSchema),
  authenticate,
  ctrlContacts.updateStatusContact
);

module.exports = router;