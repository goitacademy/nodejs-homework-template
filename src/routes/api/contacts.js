const express = require("express");

const { validateContactData } = require("../../middleware/contactsValidation");
const {
  getContactsController,
  getContactByIdController,
  postContactController,
  deleteContactController,
  putContactController,
} = require("../../controllers/contactsController");

const router = express.Router();

router.get("/", getContactsController);

router.get("/:contactId", getContactByIdController);

router.post("/", validateContactData, postContactController);

router.delete("/:contactId", deleteContactController);

router.put("/:contactId", validateContactData, putContactController);

module.exports = router;
