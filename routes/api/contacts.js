const express = require("express");
const router = express.Router();
const { isValidId, ValidBody } = require("../../middlewares");
const {
  getContacts,
  getContactById,
  addContact,
  deleteContatcById,
  updateContact,
  updateStatusContact,
} = require("../../controllers");

router.get("/", getContacts);

router.get("/:contactId", isValidId, getContactById);

router.post("/", ValidBody.ValidFullContact, addContact);

router.delete("/:contactId", isValidId, deleteContatcById);

router.put("/:contactId", isValidId, ValidBody.ValidFullContact, updateContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  ValidBody.ValidFavorite,
  updateStatusContact
);

module.exports = router;
