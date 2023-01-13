const express = require("express");
const router = express.Router();

const {
  getContactsList,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatus,
} = require("../../controllers/contactsController");

router.get("/", getContactsList);
router.get("/:contactId", getContactById);
router.post("/", addContact);
router.delete("/:contactId", removeContact);
router.put("/:contactId", updateContact);
router.patch("/:contactId/favorite", updateStatus);

module.exports = router;
