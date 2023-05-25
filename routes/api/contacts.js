const express = require("express");
const router = express.Router();

const validate = require("../../helpers/validateBody");
const contacts = require("../../controlers/functionsforworkingwithсontacts");

router.get("/", contacts.getAllcontacts);

router.get("/:id", contacts.getContactById);

router.post("/", validate.validateBody, contacts.createContact);

router.delete("/:id", contacts.deleteContact);

router.put("/:id", validate.validateBody, contacts.updateContact);

module.exports = router;
