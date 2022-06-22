const express = require('express');
const { contacts: ctrl } =require ('../../controllers');

const { ctrlWrapper } = require('../../helpers')

const validation = require('../../middlewares/validation')
const isValidId = require('../../middlewares/isValidId')
const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.listContacts))

router.get('/:id', isValidId, ctrlWrapper(ctrl.getContactById))

router.post('/', validation(schemas.schemaAdd), ctrlWrapper(ctrl.addContact));

router.delete('/:id', isValidId, ctrlWrapper(ctrl.removeContact))

router.put('/:id',isValidId, validation(schemas.schemaUpdate), ctrlWrapper(ctrl.updateContactById))

router.patch('/:id/favorite',isValidId, validation(schemas.schemaPatch), ctrlWrapper(ctrl.updateFavorite))

module.exports = router;