const express = require('express');
const ctrl = require('../../controllers/contacts')
const validateBody = require ('../../middelewares/validateBody');
const {schema} = require ('../../models/contact');
const isValidId = require('../../middelewares/isValidid');
const authenticate = require('../../middelewares/authenticate');

const router = express.Router()

router.get('/', authenticate, ctrl.getAllContacts)

router.get('/:id', authenticate, isValidId, ctrl.getContactById)

router.post('/', authenticate, validateBody(schema.addSchema), ctrl.addContact)

router.delete('/:id', authenticate, isValidId, ctrl.deleteContactById)

router.put('/:id', authenticate, isValidId, validateBody(schema.addSchema), ctrl.updateContact)

router.patch('/:id/favorite', authenticate, isValidId, validateBody(schema.updateFavorite), ctrl.updateFavorite)

module.exports = router


