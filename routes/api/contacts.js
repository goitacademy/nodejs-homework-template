const express = require('express');
const {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateFavorite,
} = require('../../controllers/contacts/controller');
const ctrlWrapper = require('../../helpers/ctrlWrapper');

const router = express.Router();

router.get('/', ctrlWrapper(listContacts));

router.get('/:contactId', ctrlWrapper(getContactById));

router.post('/', ctrlWrapper(addContact));

router.delete('/:contactId', ctrlWrapper(removeContact));

router.put('/:contactId', ctrlWrapper(updateContact));

router.patch('/:contactId/favorite', ctrlWrapper(updateFavorite));

module.exports = router;
