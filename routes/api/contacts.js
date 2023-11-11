const express = require('express');

const HttpError = require('../../HttpErrors/httpErrors');
const bookRequest = require("../../models/contacts");
const { schemas } = require('../../models/contactsSchema');
const router = express.Router()
const jsonParser = express.json();

router.get('/', bookRequest.listContacts)

router.get('/:contactId', bookRequest.getContactById) 

router.post("/", validateBody(schemas.addSchema), bookRequest.addContact);

router.delete("/:contactId", bookRequest.removeContact);

router.put('/:contactId', validateBody(schemas.addSchema), bookRequest.updateContact)

router.patch("/:id/favourite", validateBody(schemas.addSchema), bookRequest.updateFavorite)

module.exports = router
