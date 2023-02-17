const express = require("express");
const {
  getListContacts,
  getContact,
  removeContactById,
  addNewContact,
  updateContactById,
} = require("../../controllers/contactsController");

const router = express.Router();

router.get("/", getListContacts);

router.get("/:contactId", getContact);

router.post("/", addNewContact);

router.delete("/:contactId", removeContactById);

router.put("/:contactId", updateContactById);

module.exports = router;
