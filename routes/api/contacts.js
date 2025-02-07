const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contactsController");
const authMiddleware = require("../../middlewares/auth");

router.get("/", authMiddleware, listContacts);

router.get("/:contactId", getContactById);

router.post("/", authMiddleware, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", updateContact);

router.patch("/:contactId/favorite", updateStatusContact);

module.exports = router;
