const express = require("express");
const router = express.Router();

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { contactsController } = require("../../controllers");

const { addSchema } = require("../../models/contact/contact");

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
  validateBody(addSchema),
  contactsController.addContact
);

router.delete("/:contactId", authenticate, contactsController.removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(addSchema),
  contactsController.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  contactsController.updateFavorite
);

module.exports = router;
