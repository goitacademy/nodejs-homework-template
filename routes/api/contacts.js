const express = require("express");
const {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts.controller");
const {
  newContacts,
  editContacts,
  favoriteSchema,
} = require("../../validJoi/validContacts");
const {
  validContact,
  validUpdateContact,
} = require("../../helpers/validContacts");
const ctrlWrapper = require("../../helpers/ctrlWrapper ");
const { validToken } = require("../../helpers/validToken");
const router = express.Router();

router.get("/", ctrlWrapper(validToken), ctrlWrapper(getAllContacts));

router.get("/:contactId", ctrlWrapper(validToken), ctrlWrapper(getContactById));

router.post(
  "/",
  ctrlWrapper(validToken),
  validContact(newContacts),
  ctrlWrapper(addContact)
);

router.delete(
  "/:contactId",
  ctrlWrapper(validToken),
  ctrlWrapper(removeContact)
);

router.put(
  "/:contactId",
  ctrlWrapper(validToken),
  validUpdateContact(editContacts),
  ctrlWrapper(updateContact)
);

router.patch(
  "/:contactId/favorite",
  ctrlWrapper(validToken),
  validContact(favoriteSchema),
  ctrlWrapper(updateStatusContact)
);

module.exports = router;