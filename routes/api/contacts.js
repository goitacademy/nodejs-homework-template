const express = require("express");
const isValidId = require("../../middlewares/isValidId");

const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
} = require("../../controllers/contactControllers");

router.get("/", listContacts);

router.get("/:contactId", isValidId, getContactById);

router.post("/", addContact);

router.delete("/:contactId", isValidId, removeContact);

router.put("/:contactId", isValidId, updateContact);

router.patch("/:contactId/favorite", isValidId, updateFavorite);

module.exports = router;
