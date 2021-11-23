const conatctBodyValidation = require("../../middlewares/validation/contactBodyValidation");
const express = require("express");
const router = express.Router();
const { contacts } = require("../../model/controllers");

router.get("/", contacts.getContactsList);
router.get("/:contactId", contacts.getContactByIdHandler);

router.post("/", conatctBodyValidation, contacts.postContact);

router.delete("/:contactId", contacts.deleteContact);

router.put("/:contactId", conatctBodyValidation, contacts.putContact);

module.exports = router;
