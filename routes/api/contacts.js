const express = require('express');
const ctrl = require('../../controllers/contacts')
const validateBody = require ('../../middelewares/validateBody');
const {schema} = require ('../../models/contact');
const isValidId = require('../../middelewares/isValidid');

const router = express.Router()

router.get('/', ctrl.getAllContacts)

router.get('/:id', isValidId, ctrl.getContactById)

router.post('/', validateBody(schema.addSchema), ctrl.addContact)

router.delete('/:id',isValidId, ctrl.deleteContactById)

router.put('/:id', isValidId, validateBody(schema.addSchema), ctrl.updateContact)

router.patch('/:id/favorite', isValidId, validateBody(schema.updateFavorite), ctrl.updateFavorite)

module.exports = router


