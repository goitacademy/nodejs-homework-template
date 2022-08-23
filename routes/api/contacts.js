const express = require('express');

const ctrl = require('../../controllers/index');

const {ctrlWrapper} = require("../../helpers");

const {validationBody, validId} = require('../../middlewares/isValidId');

const router = express.Router();

const { schemas } = require("../../models/conatcts");

router.get('/', ctrlWrapper(ctrl.listContacts));

router.get('/:contactId', validId, ctrlWrapper(ctrl.getContactById));

router.post('/', validationBody(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', validId, ctrlWrapper(ctrl.removeContact));

router.put('/:contactId', validationBody(schemas.addSchema), validId,  ctrlWrapper(ctrl.updateContact));

router.patch('/:contactId/favorite', validationBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));

module.exports = router;
