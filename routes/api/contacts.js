const express = require("express");
const router = express.Router();

const {
  getContactsList,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contactsController");

router.get("/", getContactsList);
router.get("/:contactId", getContactById);
router.post("/", addContact);
router.delete("/:contactId", removeContact);
router.put("/:contactId", updateContact);

module.exports = router;
