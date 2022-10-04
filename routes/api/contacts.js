const express = require('express');

const { validation, ctrlWrapper } = require('../../middleware');
const { joiSchema: contactsSchema, favoriteJoiSchema } = require('../../models');
const { contacts: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validation(contactsSchema), ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', ctrlWrapper(ctrl.removeContact));

router.put('/:contactId', validation(contactsSchema), ctrlWrapper(ctrl.updateContact));

router.patch('/:contactId/favorite', validation(favoriteJoiSchema), ctrlWrapper(ctrl.updateStatusContact));

module.exports = router
