const express = require("express");
const router = express.Router();

const contactsController = require("../../controllers");
const { schemas } = require("../../models/contacts");
const { validateData, checkBody, isValidId } = require("../../middlewares");

router.get("/", contactsController.getContacts);
router.get("/:contactId", isValidId, contactsController.getContact);
router.post(
  "/",
  checkBody,
  validateData(schemas.requiredFieldsSchema),
  contactsController.addContact
);
router.delete("/:contactId", isValidId, contactsController.deleteContact);
router.put(
  "/:contactId",
  isValidId,
  checkBody,
  validateData(schemas.requiredFieldsSchema),
  contactsController.updateContact
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateData(schemas.updateFavoriteSchema),
  contactsController.updateStatusContact
);

module.exports = router;
