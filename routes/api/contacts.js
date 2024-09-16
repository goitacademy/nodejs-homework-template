const express = require("express");

const contactsController = require("../../controllers/contactsController");

const {
  validateBody,
  isValidId,
  isAuthenticated,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", isAuthenticated, contactsController.listContacts);

router.get(
  "/:contactId",
  isAuthenticated,
  isValidId,
  contactsController.getContactById
);

router.post(
  "/",
  isAuthenticated,
  validateBody(schemas.joiSchema),
  contactsController.addContact
);

router.delete(
  "/:contactId",
  isAuthenticated,
  isValidId,
  contactsController.removeContact
);

router.put(
  "/:contactId",
  isAuthenticated,
  isValidId,
  validateBody(schemas.joiSchema),
  contactsController.updateContact
);

router.patch(
  "/:contactId/favorite",
  isAuthenticated,
  isValidId,
  validateBody(schemas.joiFavoriteSchema),
  contactsController.updateFavorite
);

module.exports = router;
