const express = require("express");
const router = express.Router();

const {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} = require("../../controllers/contactsController");



router.get("/", auth, getContacts);
router.get("/:contactId", auth, getContactById);
router.post("/",  createContact);
router.delete("/:contactId",  deleteContact);
router.put("/:contactId",  updateContact);

module.exports = router;
