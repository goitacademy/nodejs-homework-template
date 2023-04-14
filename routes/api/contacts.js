const express = require("express");

const ctrl = require("../../controllers/contacts-controllers");

const { validateBody } = require("../../utils");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContactsById);

router.post("/", validateBody(schemas.addShema), ctrl.addContact);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", validateBody(schemas.addShema), ctrl.updateContact);

module.exports = router;
