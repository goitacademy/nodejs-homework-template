const express = require("express");
const router = express.Router();

const contacts = require("../../controllers/contactsController");
const { validateId, validateBody } = require("../../middlewares");
const schemas = require("../../schemas");

router.get("/", contacts.getAllContacts);

router.get("/:contactId", validateId, contacts.getContactById);

router.post("/", validateBody(schemas.addSchema), contacts.addContact);

router.delete("/:contactId", validateId, contacts.deleteContact);

router.put(
  "/:contactId",
  validateId,
  validateBody(schemas.addSchema),
  contacts.updateContact
);

router.patch(
  "/:contactId/favorite",
  validateId,
  validateBody(schemas.favoriteSchema),
  contacts.updateStatusContact
);

module.exports = router;
