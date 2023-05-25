const express = require("express");

const contactsController = require("../../controllers/contacts-controllers");

const { schemas } = require("../../models/contacts");

const {
  validateBody,
  isValidId,
  validateFavBody,
  authenticate,
} = require("../../middlewares");

const jsonParser = express.json();

const router = express.Router();

router.get("/", authenticate, contactsController.getAllContacts);

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  contactsController.getContactById
);

router.post(
  "/",
  jsonParser,
  authenticate,
  validateBody(schemas.contactAddSchema),
  contactsController.addContact
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  contactsController.deleteContactById
);

router.put(
  "/:contactId",
  authenticate,
  jsonParser,
  isValidId,
  validateBody(schemas.contactAddSchema),
  contactsController.updateContactById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  jsonParser,
  isValidId,
  validateFavBody(schemas.updateFavoriteSchema),
  contactsController.updateStatusContact
);

module.exports = router;
