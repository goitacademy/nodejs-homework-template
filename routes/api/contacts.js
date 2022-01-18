const express = require("express");

const {
  validateContactData,
} = require("../../middleware/contacts/contactsValidation");
const {
  getContactsController,
  getContactByIdController,
  postContactController,
  deleteContactController,
  putContactController,
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/", getContactsController);

router.get("/:contactId", getContactByIdController);

router.post("/", validateContactData, postContactController);

router.delete("/:contactId", deleteContactController);

router.put("/:contactId", validateContactData, putContactController);

module.exports = router;
