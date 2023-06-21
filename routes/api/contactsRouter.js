const express = require("express");
const router = express.Router();

const { validateBody, isValidId } = require("../../middlewares");

const { contactsController } = require("../../controllers");

const { addSchema } = require("../../models/contacts/contacts");

router.get("/", contactsController.listContacts);

router.get("/:contactId", isValidId, contactsController.getContactById);

router.post("/", validateBody(addSchema), contactsController.addContact);

router.delete("/:contactId", contactsController.removeContact);

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
