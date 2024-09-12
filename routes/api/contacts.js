const express = require("express");

const contactsController = require("../../controllers/contacts-controller");

const { schemas } = require("../../models/contacts");
const { validateBody } = require("../../decorators");
const { isValidId } = require("../../middlewares");
const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:id", isValidId, contactsController.getContactById);

router.post(
  "/",
  validateBody(schemas.contactAddSchema),
  contactsController.addContact
);

router.delete("/:id", isValidId, contactsController.removeContact);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.contactAddSchema),
  contactsController.updateContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  contactsController.updateStatusContact
);

module.exports = router;
