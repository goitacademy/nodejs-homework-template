const express = require("express");
const {
  getContacts,
  getContactById,
  addContact,
  deleteContactById,
  updateContactById,
} = require("../../controllers/contactsController");

const validation = require("../../middlewares/validation");

const router = new express.Router();

router.get("/", getContacts);

router.get("/:id", getContactById);

router.post("/", validation.validateContactBody, addContact);

router.delete("/:id", deleteContactById);

router.put("/:id", validation.validateContactBody, updateContactById);

module.exports = router;