const express = require("express");
const contactsController = require("../../controllers/contactsController");
const {
  validateBody,
  isValidId,
  isEmptyBody,
  authenticate,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");
const router = express.Router();

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
  isEmptyBody,
  validateBody(schemas.addSchema),
  contactsController.addContact
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  isEmptyBody,
  validateBody(schemas.addSchema),
  contactsController.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  isEmptyBody,
  validateBody(schemas.updateFavoriteSchema),
  contactsController.updateStatusContact
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  contactsController.removeContact
);

module.exports = router;
