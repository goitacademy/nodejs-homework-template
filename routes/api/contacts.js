const express = require("express");

const wrap = require("../../controllers/contacts.js");
const { schemas } = require("../../models/contact.js")
const {
  isValidId,
  isValidData,
  isValidFavoriteField,
} = require("../../middlewares");

const router = express.Router();

const jsonParser = express.json();

router.get("/", wrap.listContacts);

router.get("/:contactId", isValidId, wrap.getById);

router.post(
  "/",
  jsonParser,
  isValidData(schemas.contactSchemaJoi),
  wrap.addContact
);

router.delete("/:contactId", isValidId, wrap.removeContact);

router.put(
  "/:contactId",
  jsonParser,
  isValidId,
  isValidData(schemas.contactSchemaJoi),
  wrap.updateContact
);

router.patch(
  "/:contactId/favorite",
  jsonParser,
  isValidId,
  isValidFavoriteField,
  isValidData(schemas.updateFavoriteSchema),
  wrap.updateStatusContact
);

module.exports = router;
