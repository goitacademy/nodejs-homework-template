const express = require('express');

const { auth, validation, ctrlWrapper } = require('../../middleware');
const { joiSchema: contactsSchema, favoriteJoiSchema } = require('../../models');
const { contacts: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', auth, ctrlWrapper(ctrl.getAll));

router.get('/:contactId', auth, ctrlWrapper(ctrl.getById));

router.post('/', auth, validation(contactsSchema), ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', auth, ctrlWrapper(ctrl.removeContact));

router.put('/:contactId', auth, validation(contactsSchema), ctrlWrapper(ctrl.updateContact));

router.patch('/:contactId/favorite', auth, validation(favoriteJoiSchema), ctrlWrapper(ctrl.updateStatusContact));

module.exports = router
