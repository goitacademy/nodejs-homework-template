const express = require('express');

const ctrl = require('../../controllers/index');

const {ctrlWrapper} = require('../../helpers');

const {validationBody, isValidId} = require('../../middlewares');

const router = express.Router();

const { schemas } = require('../../models/contacts');

router.get('/', ctrlWrapper(ctrl.listContacts));

router.get('/:id', isValidId, ctrlWrapper(ctrl.getContactById));

router.post('/', validationBody(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.delete('/:id', isValidId, ctrlWrapper(ctrl.removeContact));

router.put('/:id', validationBody(schemas.addSchema), isValidId,  ctrlWrapper(ctrl.updateContact));

router.patch('/:id/favorite', validationBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));

module.exports = router;
