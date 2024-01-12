const express = require('express');

const ContactsService = require("../../controllers/ContactsService.js");
const validate = require("../../middlewares/validate.js");
const schema = require("../../middlewares/schema/contact.js");

const router = express.Router();
const jsonParser = express.json();

router.get("/", ContactsService.getAllContacts);


router.get("/:contactId", ContactsService.getContactById);

router.post("/", jsonParser, validate(schema), ContactsService.addNewContact);

router.delete("/:contactId", ContactsService.deleteContact);

router.put("/:contactId", jsonParser, validate(schema), ContactsService.updateContactId);

router.patch("/:contactId/favorite", jsonParser, validate(schema), ContactsService.changeContactFavorite);

module.exports = router
