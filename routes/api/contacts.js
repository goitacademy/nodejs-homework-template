const express = require('express');
const { contactsController: ctrl } = require('../../controllers');
const { ctrlWrapper } = require('../../helpers');
const { auth, isValidId } = require('../../middlewares');

const router = express.Router();

router.get('/', auth, ctrlWrapper(ctrl.listContacts));

router.get('/:contactId', auth, isValidId, ctrlWrapper(ctrl.getContactById));

router.post('/', auth, ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', auth, isValidId, ctrlWrapper(ctrl.removeContact));

router.put('/:contactId', auth, isValidId, ctrlWrapper(ctrl.updateContact));

router.patch(
    '/:contactId/favorite',
    auth,
    isValidId,
    ctrlWrapper(ctrl.updateFavorite),
);

module.exports = router;
