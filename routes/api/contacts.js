const express = require('express')
const router = express.Router()
const {validateBody} = require('../../decorators')
const {schema} = require('../../schemas')
const controllers = require('../../controllers')

router.get('/', controllers.getAllContacts)

router.get('/:contactId', controllers.getContactById)

router.post('/', validateBody(schema), controllers.addNewContact)

router.delete('/:contactId', controllers.removeContactById)

router.put('/:contactId', validateBody(schema), controllers.updateContactById)

module.exports = router
