const express = require('express')
const router = express.Router()
const { contacts: ctrl } = require('../../controllers')
const { validation, authenticate } = require('../../midlewares')
const { joiContactSchema } = require('../../models')

router.get('/', authenticate, ctrl.getAllContacts)

router.get('/:contactId', authenticate, ctrl.getContactById)

router.post('/', authenticate, validation(joiContactSchema), ctrl.addNewContact)

router.delete('/:contactId', authenticate, ctrl.deleteContactById)

router.put('/:contactId', authenticate, validation(joiContactSchema), ctrl.contactUpdate)

router.patch('/:contactId/favorite', authenticate, ctrl.changeStatus)

module.exports = router
