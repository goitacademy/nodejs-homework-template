const express = require("express");
const router = express.Router();

const contacts = require("../../controllers");
const { validateId, validateBody, authenticate } = require("../../middlewares");
const schemas = require("../../schemas/contactsSchema");

router.get("/", authenticate, contacts.getAllContacts);

router.get("/:contactId", authenticate, validateId, contacts.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  contacts.addContact
);

router.delete("/:contactId", authenticate, validateId, contacts.deleteContact);

router.put(
  "/:contactId",
  authenticate,
  validateId,
  validateBody(schemas.addSchema),
  contacts.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateId,
  validateBody(schemas.favoriteSchema),
  contacts.updateStatusContact
);

module.exports = router;
