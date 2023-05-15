const express = require("express");
const router = express.Router();
const cntController = require("../../Controllers/contact-controller");

const schema = require("../../schema/addContactSchema");
const { validationDec } = require("../../decorators");

router.get("/", cntController.getAllContacts);

router.get("/:id", cntController.getContactById);

router.post("/", validationDec(schema), cntController.addContact);

router.put("/:id", cntController.updateContact);

router.delete("/:id", cntController.removeContact);

module.exports = router;
