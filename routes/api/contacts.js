const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const contactSchema = require("../../schemas/contactsSchema");

const router = express.Router();

router.get("/", ctrl.getContacts);

router.get("/:id", ctrl.getContactById);

router.post("/", validateBody(contactSchema), ctrl.addContact);

router.delete("/:id", ctrl.deleteContact);

router.put("/:id", validateBody(contactSchema), ctrl.updateContact);

module.exports = router;
