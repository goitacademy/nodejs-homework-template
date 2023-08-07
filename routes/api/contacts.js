const express = require("express");
const ctrl = require("../../controllers/contacts")
const {contactSchemaPost, contactSchemaPut} = require("../../schemasValidation")
const validateBody = require("../../middlewares")

const router = express.Router();


router.get("/", ctrl.getAllContactsList);

router.get("/:id",ctrl.getContactsById);

router.post("/", validateBody(contactSchemaPost), ctrl.addContact );

router.delete("/:id", ctrl.deleteContact);

router.put("/:id", validateBody(contactSchemaPut), ctrl.updateContact);

module.exports = router;
