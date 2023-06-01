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

router.use(authenticate);

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", isValidId, contactsController.getContactById);

router.post(
  "/",
  jsonParser,
  validateBody(schemas.contactAddSchema),
  contactsController.addContact
);

router.delete("/:contactId", isValidId, contactsController.deleteContactById);

router.put(
  "/:contactId",
  jsonParser,
  isValidId,
  validateBody(schemas.contactAddSchema),
  contactsController.updateContactById
);

router.patch(
  "/:contactId/favorite",
  jsonParser,
  isValidId,
  validateFavBody(schemas.updateFavoriteSchema),
  contactsController.updateStatusContact
);

module.exports = router;
