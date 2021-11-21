const express = require("express");
const router = new express.Router();

const { contactValidator } = require("../middlewares/validationMiddleware");

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
} = require("../controllers/contactsController");

router.get("/", getContactsController);

router.get("/:contactId", getContactByIdController);

router.post("/", contactValidator, addContactController);

router.delete("/:contactId", deleteContactController);

router.put("/:contactId", updateContactController);

module.exports = router;
