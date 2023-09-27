const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contacts')
const { validateBody } = require('../../middlewares')
const schemas = require('../../schemas/contacts')

const contacts = require('../../models/contacts')

router.get('/', ctrl.getAll)

router.get('/:contactId', ctrl.getById)

router.post('/', validateBody(schemas.addSchema), ctrl.addContact)

router.delete('/:contactId', ctrl.deleteContact)

router.put('/:contactId', validateBody(schemas.addSchema), ctrl.updateContact)

module.exports = router
