const express = require('express');
const jsonParser = express.json();
const contactRequest = require("../../models/contacts");
const router = express.Router()


router.get('/', contactRequest.listContacts)

router.get('/:contactId', contactRequest.getContactById) 

router.post("/", jsonParser, contactRequest.addContact);

router.delete("/:contactId", contactRequest.removeContact);

router.put('/:contactId', jsonParser, contactRequest.updateContact)

router.patch("/:contactId/favorite", jsonParser, contactRequest.updateFavorite);

module.exports = router
