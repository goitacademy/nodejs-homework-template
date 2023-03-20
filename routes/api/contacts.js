const express = require('express')

const ctrl = require('../../controllers/contacts')

const {validateBody, isValidId, validateFavorite, authenticate} = require('../../middlewares')

const {schemas} = require('../../models/contact')

const router = express.Router()

router.get('/', authenticate, ctrl.getListContacts)

router.get('/:contactId', authenticate, isValidId, ctrl.findContactById)

router.post('/', authenticate, validateBody(schemas.addContactSchema), ctrl.addNewContact)

router.delete('/:contactId', authenticate, isValidId, ctrl.deleteContactById)

router.put('/:contactId', authenticate, isValidId, validateBody(schemas.updateContactSchema), ctrl.updateContactById)

router.patch('/:contactId/favorite', authenticate, isValidId, validateFavorite, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact)

module.exports = router
