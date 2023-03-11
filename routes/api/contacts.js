const express = require('express')

const ctrl = require('../../controllers/contacts')

const {validateBody, isValidId, validateFavorite} = require('../../middlewares')
const {shemas} = require('../../models/contact')

const router = express.Router()

router.get('/', ctrl.getListContacts)

router.get('/:contactId', isValidId, ctrl.findContactById)

router.post('/', validateBody(shemas.addContactSchema), ctrl.addNewContact)

router.delete('/:contactId', isValidId, ctrl.deleteContactById)

router.put('/:contactId', isValidId, validateBody(shemas.updateContactSchema), ctrl.updateContactById)

router.patch('/:contactId/favorite', isValidId, validateFavorite, validateBody(shemas.updateFavoriteSchema), ctrl.updateStatusContact)

module.exports = router
