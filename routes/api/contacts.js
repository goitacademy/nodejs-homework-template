const express = require('express')

const { joiContactSchema } = require('../../models/contact')
const { validation } = require('../../middlewares')

const ctrl = require('../../controllers/contactsData')

const validationMiddleware = validation(joiContactSchema)

const router = express.Router()
router.get('/', ctrl.listContacts)

router.get('/:contactId', ctrl.getContactById)

router.post('/', validationMiddleware, ctrl.addContact)

router.put('/:contactId', validationMiddleware, ctrl.updateContact)

router.delete('/:contactId', ctrl.removeContact)

router.patch('/:contactId/favourite', ctrl.updateStatusContact)

module.exports = router
