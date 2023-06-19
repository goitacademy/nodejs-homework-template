const express = require("express");

const { contactsController } = require("../../controllers");

const { contactsJoiSchemas } = require("../../schemas");

const { validateBody } = require("../../decorators");

const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", isValidId, contactsController.getContactById);

router.post(
  "/",
  validateBody(contactsJoiSchemas.contactAddSchema),
  contactsController.addContact
);

router.delete("/:contactId", contactsController.deleteContactById);

router.put(
  "/:contactId",
  isValidId,
  validateBody(contactsJoiSchemas.contactUpdateSchema),
  contactsController.updateContactById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(contactsJoiSchemas.contactUpdateFavoriteSchema),
  contactsController.updateStatusContact
);

module.exports = router;
