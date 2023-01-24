const express = require("express");

const {
  getContactsCtrl,
  getContactByIdCtrl,
  removeContactCtrl,
  addContactCtrl,
  updateContactCtrl,
} = require("../../controllers/contactsController");

const router = express.Router();

router.get("/", getContactsCtrl);

router.get("/:contactId", getContactByIdCtrl);

router.post("/", addContactCtrl);

router.delete("/:contactId", removeContactCtrl);

router.put("/:contactId", updateContactCtrl);

module.exports = router;
