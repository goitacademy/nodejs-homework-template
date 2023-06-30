const express = require("express");
const router = express.Router();

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { contactsControllers } = require("../../controllers");

const { addSchema } = require("../../models/contact/contact");

router.get("/", authenticate, contactsControllers.listContacts);

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  contactsControllers.getContactById
);

router.post(
  "/",
  authenticate,
  validateBody(addSchema),
  contactsControllers.addContact
);

router.delete("/:contactId", authenticate, contactsControllers.removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(addSchema),
  contactsControllers.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  contactsControllers.updateFavorite
);

module.exports = router;
