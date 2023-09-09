const express = require("express");

const wrap = require("../../controllers/contacts.js");
const { schemas } = require("../../models/contact.js");
const {
  isValidId,
  isValidData,
  isValidFavoriteField,
  authenticate,
} = require("../../middlewares");

const router = express.Router();

const jsonParser = express.json();

router.get("/", authenticate, wrap.listContacts);

router.get("/:contactId", authenticate, isValidId, wrap.getById);

router.post(
  "/",
  authenticate,
  jsonParser,
  isValidData(schemas.contactSchemaJoi),
  wrap.addContact
);

router.delete("/:contactId", authenticate, isValidId, wrap.removeContact);

router.put(
  "/:contactId",
  authenticate,
  jsonParser,
  isValidId,
  isValidData(schemas.contactSchemaJoi),
  wrap.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  jsonParser,
  isValidId,
  isValidFavoriteField,
  isValidData(schemas.updateFavoriteSchema),
  wrap.updateStatusContact
);

module.exports = router;
