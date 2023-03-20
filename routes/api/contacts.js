const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const {
  contactSchemaJoi,
  contactSchemaFavorite,
} = require("../../models/contact");

const router = express.Router();

router.post("/", authenticate, validateBody(contactSchemaJoi), ctrl.contactAdd);

router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(contactSchemaJoi),
  ctrl.updateContactById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(contactSchemaFavorite),
  ctrl.updateStatusContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteContact);

module.exports = router;
