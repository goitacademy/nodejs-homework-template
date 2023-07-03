const express = require("express");
const { contacts } = require("../../controllers");

const {
  authMiddleware,
  contactJoi,
  favoriteJoi,
  isValidId,
  validation,
} = require("../../middleware");

const validContact = validation(contactJoi);
const validFavorite = validation(favoriteJoi);

const router = express.Router();

router.get("/", authMiddleware, contacts.getAll);
router.get("/:contactId", authMiddleware, isValidId, contacts.getContactById);
router.post("/", authMiddleware, validContact, contacts.addContact);
router.delete("/:contactId", authMiddleware, isValidId, contacts.removeContact);

router.put(
  "/:contactId",
  authMiddleware,
  isValidId,
  validContact,
  contacts.updateContact
);

router.patch(
  "/:contactId/favorite",
  authMiddleware,
  isValidId,
  validFavorite,
  contacts.updateContactStatus
);

module.exports = router;
