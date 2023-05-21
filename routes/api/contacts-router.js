const express = require('express');

const { getAllContacts,
    getContactById,
    addContact,
    deleteContact,
    updateContact,
    updateStatusContact } = require('../../controllers/contacts');

const { validateBody, isValidId } = require('../../decorators');
const { schemas } = require('../../models/contact');
const router = express.Router();

router.get('/', getAllContacts);

router.get('/:contactId', isValidId, getContactById);

router.post('/', validateBody(schemas.contactAddSchema), addContact);

router.delete('/:contactId', isValidId, deleteContact);

router.put('/:contactId', isValidId, validateBody(schemas.contactAddSchema), updateContact);

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), updateStatusContact);

module.exports = router;
