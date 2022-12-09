const express = require("express");
const router = express.Router();

const { validation } = require("./middleware/validation");

const {
  addContactValidation,
  changeContactValidation,
} = require("../../middleware/schemas/validationContact");

const {
  getContacts,
  getContactByID,
  postAddContact,
  deleteContact,
  putChangeContact,
} = require("../../controllers/controllers");

router.get("/", getContacts);

router.get("/:contactId", getContactByID);

router.post("/", validation(addContactValidation), postAddContact);

router.delete("/:contactId", deleteContact);

router.put(
  "/:contactId",
  validation(changeContactValidation),
  putChangeContact
);

module.exports = router;
