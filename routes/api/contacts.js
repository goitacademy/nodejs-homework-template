const express = require("express");
const router = express.Router();

const contactValidationMiddleware = require("../../contacts.validators");
const {
  listContactsHandler,
  getContactByIdHandler,
  addContactHandler,
  removeContactHandler,
  updateContactHandler,
} = require("../../contacts.controller");

router.get("/", listContactsHandler);
router.get("/:id", getContactByIdHandler);
router.post("/", contactValidationMiddleware, addContactHandler);
router.delete("/:id", removeContactHandler);
router.put("/:id", contactValidationMiddleware, updateContactHandler);

module.exports = router;
