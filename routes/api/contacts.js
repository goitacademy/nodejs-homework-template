const express = require('express');

const { contacts: ctrl } = require('../../controllers');

const { auth, validation, ctrlWrapper } = require('../../middlewares');

const { contactSchemaJoi, favoriteSchemaJoi } = require('../../models');

const router = express.Router();

router.post('/', auth, validation(contactSchemaJoi), ctrlWrapper(ctrl.add));

router.put('/:contactId', validation(contactSchemaJoi), ctrlWrapper(ctrl.updateById));

router.patch('/:contactId/favorite', validation(favoriteSchemaJoi), ctrlWrapper(ctrl.updateFavorite));

router.get('/', auth, ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.delete('/:contactId', ctrlWrapper(ctrl.deleteById));

module.exports = router;