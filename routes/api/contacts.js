const express = require("express");

const contactsController = require("../../controllers/controllers");

const { schemas } = require("../../models/book");

const { validateBody, validateBodyFavorite } = require("../../decorators");
const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", isValidId, contactsController.getContactById);

router.post(
  "/",
  validateBody(schemas.contactSchemaJoi),
  contactsController.addContact
);

router.delete("/:contactId", isValidId, contactsController.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.contactSchemaJoi),
  contactsController.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBodyFavorite(schemas.updateFavoriteSchema),
  contactsController.updateStatusContact
);

module.exports = router;
