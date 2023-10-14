const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");
const validate = require("../../middlewares/validate");
const schema = require("../../schema/contacts");

router.get("/", ctrl.listContacts);

router.post("/", validate(schema), ctrl.addContact);

router.get("/:contactId", ctrl.getContactById);

router.put("/:contactId", validate(schema), ctrl.updateContact);

router.delete("/:contactId", ctrl.removeContact);

module.exports = router;