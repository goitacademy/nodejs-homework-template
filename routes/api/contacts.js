const express = require("express");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const {
  ContactModel: { schemas },
} = require("../../models");
const { ctrlContacts } = require("../../controllers");

const router = express.Router();

router.get("/", authenticate, ctrlContacts.listContacts);

router.get("/:id", authenticate, isValidId, ctrlContacts.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),

  ctrlContacts.addContact
);

router.delete("/:id", authenticate, isValidId, ctrlContacts.removeContact);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),

  ctrlContacts.updateContact
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrlContacts.updateStatusContact
);

module.exports = router;
