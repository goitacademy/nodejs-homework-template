const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contactsControllers')
const {validateBody} = require('../../middleware')
const schema = require('../../schemas/contactsSchema')

router.get('/', ctrl.listContacts)

router.get('/:contactId', ctrl.getContactById)

router.post('/', validateBody(schema.addSchema), ctrl.addContact)

router.delete('/:contactId', ctrl.removeContact)

router.put('/:contactId', validateBody(schema.addSchema), ctrl.updateContact)

module.exports = router