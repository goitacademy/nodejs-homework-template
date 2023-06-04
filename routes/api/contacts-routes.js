const express = require("express");
const contactsController = require("../../controllers/contacts-controllers");
const {
  contactAddSchema,
  contactPutSchema,
  contactUpdateFavoriteSchema,
} = require("../../schemas");
const { validateBody } = require("../../decorators");
const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", isValidId, contactsController.getContactById);

router.post("/", validateBody(contactAddSchema), contactsController.addContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(contactPutSchema),
  contactsController.updateContactById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(contactUpdateFavoriteSchema),
  contactsController.updateStatusContact
);

router.delete("/:contactId", isValidId, contactsController.removeContactById);

module.exports = router;
