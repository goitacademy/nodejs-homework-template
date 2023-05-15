const express = require('express');

const { getAllContacts,
    getContactById,
    addContact,
    deleteContact,
    updateContact } = require('../../controllers/contacts-controllers');

const schemas = require('../../schemas/contacts-schemas');
const { validateBody } = require('../../decorators');

const router = express.Router();

router.get('/', getAllContacts);

router.get('/:contactId', getContactById);

router.post('/', validateBody(schemas.contactAddSchema), addContact);

router.delete('/:contactId', deleteContact);

router.put('/:contactId', validateBody(schemas.contactAddSchema), updateContact);

module.exports = router;
