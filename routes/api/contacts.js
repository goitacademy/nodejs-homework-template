const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../controllers/contacts");


router.get("/", listContacts);
router.get("/:contactId", getContactById);
router.delete("/:contactId", removeContact);
router.post("/", addContact);
router.put("/:contactId", updateContact);
module.exports = router;


