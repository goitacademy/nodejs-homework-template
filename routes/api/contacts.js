const express = require('express')

const router = express.Router()

const ctrl = require('../../controllers/contacts')

const validateBody = require("../../middlewares/validateBody")

const schemas = require("../../schemas/contacts")

router.get("/", ctrl.getAll)

router.get('/:contactId', ctrl.getById)

router.post('/', validateBody(schemas.addSchema), ctrl.addContact)

router.delete('/:contactId', ctrl.deleteContact)

router.put('/:contactId', validateBody(schemas.changeSchema), ctrl.updateContact)

module.exports = router
