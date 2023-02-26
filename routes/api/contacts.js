const express = require('express')

const ctrl = require('../../controllers/contacts')

const {validateBody} = require('../../middlewares')
const shemas = require('../../schemas/contacts')

const router = express.Router()

router.get('/', ctrl.getListContacts)

router.get('/:contactId', ctrl.findContactById)

router.post('/', validateBody(shemas.addContactSchema), ctrl.addNewContact)

router.delete('/:contactId', ctrl.deleteContactById)

router.put('/:contactId', validateBody(shemas.updateContactSchema), ctrl.updateContactById)

module.exports = router
