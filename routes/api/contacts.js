const express = require("express");
const contacts = require("../../controllers/contacts.js");

const isBodyEmpty = require('../../helpers/isBodyEmpty.js');
const validateBody = require('../../helpers/validateBody.js');
const addShema = require('../../helpers/contact-schema.js');

const contactAddValidate = validateBody(addShema);

const router = express.Router();

router.get("/", contacts.listContacts);

router.get("/:id", contacts.getContactById);

router.post("/", isBodyEmpty, contactAddValidate, contacts.addContact);

router.delete("/:id", contacts.removeContact);

router.put("/:id",isBodyEmpty, contactAddValidate, contacts.updateContact);

module.exports = router;
