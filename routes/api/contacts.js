const express = require('express')
const controllers = require('../../controllers/controllers.js')
const isEmptyBody = require('../../middlewares/isEmptyBody.js')
const validateBody = require('../../decorators/validateBody.js')
const schemaValidate = require('../../schemas/contacts.js')

const contactAddValidate = validateBody(schemaValidate.addSchema);
const contactUpdateValidate = validateBody(schemaValidate.updateSchema)

const router = express.Router()

router.get('/', controllers.getAll)

router.get('/:contactId', controllers.getById)

router.delete('/:contactId', controllers.deleteById)

router.post('/', contactAddValidate, isEmptyBody, controllers.add)

router.put('/:contactId', contactUpdateValidate, isEmptyBody, controllers.updateById)

module.exports = router
