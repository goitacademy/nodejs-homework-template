const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contactsCtrl");
const schema = require("../../schemas/ValidateSchemasContacts");
const ValidateBodyContact = require("../../middlewares/ValidateBodyAddContact");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", ValidateBodyContact(schema.validateAddContactSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.deleteContact);

// router.put("/:contactId",ValidateBodyContact(schema.validateUpdateContactSchema), ctrl.updateContact);

module.exports = router;
