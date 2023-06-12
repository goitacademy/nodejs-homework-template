const express = require("express");
const { validation, isValidId, authenticate } = require("../../middlewares");
const controller = require("../../controllers/contacts");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, controller.getContactsAll);

router.get("/:contactId", authenticate, isValidId, controller.getContactById);

router.post(
  "/",
  authenticate,
  validation(schemas.contactsAddSchema),
  controller.addContact
);

router.delete("/:contactId", authenticate, isValidId, controller.removeContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validation(schemas.contactsAddSchema),
  controller.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validation(schemas.updateFavoriteSchema),
  controller.updateFavorite
);

module.exports = router;
