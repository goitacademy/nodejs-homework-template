const express = require('express');
const router = express.Router();

const {
    getAllContacts,
    getContactById,
    addContact,
    updateContact,
    deleteContact,
} = require('../../controllers/contacts-controller');
const { validateWrapper } = require('../../decorators');
const { contactAddSchema } = require('../../schemas');

router.get('/', getAllContacts);

router.get('/:contactId', getContactById);

router.post('/', validateWrapper(contactAddSchema), addContact);

router.put('/:contactId', validateWrapper(contactAddSchema), updateContact);

router.delete('/:contactId', deleteContact);

module.exports = router;
