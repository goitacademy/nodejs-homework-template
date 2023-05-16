const express = require('express')

const ctrl = require('../../controllers/contacts-controller')
const schemas = require('../../schemas/contacts-schema')

const { validateBody } = require('../../decorators')

const router = express.Router()

router.get('/', ctrl.getAllContacts)

router.get('/:contactId', ctrl.getContactById)

router.post('/', validateBody(schemas.addSchema), ctrl.addContact)

router.delete('/:contactId', ctrl.deleteContactById)

router.put('/:contactId', validateBody(schemas.addSchema), ctrl.updateContactById)

module.exports = router
