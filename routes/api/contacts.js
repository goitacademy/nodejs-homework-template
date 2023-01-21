const express = require("express");
const {
  postContact,
  getContact,
  getContacts,
  deleteContact,
  putContact,
} = require("../../controllers/contactsController");
const {
  addContactValidation,
} = require("../../middlewares/validationMaddleware");

const router = express.Router();

router.get("/", getContacts);

router.get("/:contactId", getContact);

router.post("/", addContactValidation, postContact);

router.delete("/:contactId", addContactValidation, deleteContact);

router.put("/:contactId", addContactValidation, putContact);

module.exports = router;
