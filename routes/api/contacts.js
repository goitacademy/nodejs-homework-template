const express = require("express");

const contactsController = require("../../controllers/contacts-controller");

const router = express.Router();

const { schemas } = require("../../schemasJoi/schemasJoi");

const { validateBody, validateFavorite } = require("../../decorators");

const { isValidId } = require("../../helpers");

const { authenticate } = require("../../middleware");

router.get("/", authenticate, contactsController.listContacts);

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  contactsController.getContactById
);

router.post(
  "/",
  authenticate,
  validateBody(schemas.contactAddSchema),
  contactsController.addContact
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  contactsController.removeContact
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.contactAddSchema),
  contactsController.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateFavorite(schemas.updateFavoriteSchema),
  contactsController.updateStatusContact
);

module.exports = router;
