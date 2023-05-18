const express = require("express");

const contactsControllers = require("../../controllers/contacts-controllers");

const { schemas } = require("../../models/contact");

const validateBody = require("../../utils/validateBody");

const { isValidId } = require("../../middelewares");

const router = express.Router();

router.get("/", contactsControllers.getAllContacts);

router.get("/:id", isValidId, contactsControllers.getContactById);

router.post(
  "/",
  isValidId,
  validateBody(schemas.addContactSchema),
  contactsControllers.addContact
);

router.delete("/:id", isValidId, contactsControllers.deleteContact);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchem),
  contactsControllers.updateFavoritContact
);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.addContactSchema),
  contactsControllers.updateContact
);

module.exports = router;
