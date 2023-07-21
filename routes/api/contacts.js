const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contactsControllers')
const {validateBody, isValidId} = require('../../middleware')
const schemas = require('../../schemas/contactsSchema')

router.get('/', ctrl.listContacts)

router.get('/:contactId', isValidId, ctrl.getContactById)

router.post('/', validateBody(schemas.addSchema), ctrl.addContact)

router.delete('/:contactId', isValidId, ctrl.removeContact)

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), ctrl.updateContact)

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact)

module.exports = router