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
const isValidId = require('../../middlewares/isValidId');

const router = express.Router();

router.get('/', ctrlWrapper(listContacts));

router.get('/:contactId', isValidId, ctrlWrapper(getContactById));

router.post('/', ctrlWrapper(addContact));

router.delete('/:contactId', isValidId, ctrlWrapper(removeContact));

router.put('/:contactId', isValidId, ctrlWrapper(updateContact));

router.patch('/:contactId/favorite', isValidId, ctrlWrapper(updateFavorite));

module.exports = router;
