const express = require("express");
const router = express.Router();

const contacts = require("../../controlers/functionsforworkingwithсontacts");

router.get("/", contacts.getAllcontacts);

router.get("/:id", contacts.getContactById);

router.post("/", contacts.createContact);

router.delete("/:id", contacts.deleteContact);

router.put("/:id", contacts.updateContact);

module.exports = router;
