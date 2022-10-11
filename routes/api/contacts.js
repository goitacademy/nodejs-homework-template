const express = require('express');
const contact = require('../../controllers/contacts');
const { validateBody } = require("../../middlewars");
const { schemas } = require("../../models/contact");
const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get('/', ctrlWrapper(contact.listContacts));

router.get('/:contactId', ctrlWrapper(contact.getContactById));

router.post('/', validateBody(schemas.addSchema), ctrlWrapper(contact.addContact));

router.put('/:contactId', validateBody(schemas.addSchema), ctrlWrapper(contact.updateContact));

router.patch('/:contactId/favorite', validateBody(schemas.updateFavoriteSchema), ctrlWrapper(contact.upddateFavorite));

router.delete('/:contactId', ctrlWrapper(contact.removeContact));

module.exports = router
