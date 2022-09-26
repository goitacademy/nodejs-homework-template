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
const auth = require('../../middlewares/auth');

const router = express.Router();

router.get('/', auth, ctrlWrapper(listContacts));

router.get('/:contactId', auth, isValidId, ctrlWrapper(getContactById));

router.post('/', auth, ctrlWrapper(addContact));

router.delete('/:contactId', auth, isValidId, ctrlWrapper(removeContact));

router.put('/:contactId', auth, isValidId, ctrlWrapper(updateContact));

router.patch(
    '/:contactId/favorite',
    auth,
    isValidId,
    ctrlWrapper(updateFavorite),
);

module.exports = router;
