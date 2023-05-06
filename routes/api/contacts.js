const express = require("express");
const contactsControllers = require("../../controllers/contacts-controllers");
const { schemas } = require("../../models/contact");
const { validateBody } = require("../../utils");
const { isValidId } = require("../../middlewars");
const router = express.Router();

router.get("/", contactsControllers.getAllContacts);

router.get("/:contactId", isValidId, contactsControllers.getContactById);

router.post(
  "/",
  validateBody(schemas.contactAddSchema),
  contactsControllers.addContact
);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.contactAddSchema),
  contactsControllers.updateContactById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteContactSchema),
  contactsControllers.updateContactFavorite
);

router.delete("/:contactId", isValidId, contactsControllers.deleteContact);

module.exports = router;
