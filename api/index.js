const express = require("express");
const router = express.Router();
const validate = require("../validator/validator");


const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateContactStatus,
} = require("../controller/index");

router.get("/Contacts", getContacts);

router.get("/Contacts/:id", getContactById);

router.post("/Contacts", validate.contactValid, addContact);

router.put("/Contacts/:id",validate.contactValid, updateContact);

router.patch("/Contacts/:id/status", updateContactStatus);

router.delete("/Contacts/:id", removeContact);

module.exports = router;
