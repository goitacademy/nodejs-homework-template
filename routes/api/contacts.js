const express = require('express');
const { contacts: ctrl } =require ('../../controllers');

const { ctrlWrapper } = require('../../helpers')

const { auth, validation, isValidId } = require('../../middlewares');
const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/',auth, ctrlWrapper(ctrl.listContacts))

router.get('/:id',auth, isValidId, ctrlWrapper(ctrl.getContactById))

router.post('/',auth, validation(schemas.schemaAdd), ctrlWrapper(ctrl.addContact));

router.delete('/:id',auth, isValidId, ctrlWrapper(ctrl.removeContact))

router.put('/:id', auth,isValidId, validation(schemas.schemaUpdate), ctrlWrapper(ctrl.updateContactById))

router.patch('/:id/favorite', auth,isValidId, validation(schemas.schemaPatch), ctrlWrapper(ctrl.updateFavorite))

module.exports = router;