const express = require("express");
const {
  addContactValidation,
  changeContactValidation,
} = require("./middleware/schemes/validationMiddleware");

const {
  postAddContact,
  putChangeContact,
  getContacts,
  getContactByID,
  deleteContact,
} = require("../../controllers/contactsControllers");

const router = express.Router();

router.get("/", getContacts);

router.get("/:contactId", getContactByID);

router.post("/", addContactValidation, postAddContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", changeContactValidation, putChangeContact);

module.exports = router;
