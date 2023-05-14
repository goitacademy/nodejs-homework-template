const express = require('express')
const ctrlr = require('../../controllers/contacts')
const { validateBody } = require('../../middlewares')
const schemas = require('../../schemas/contacts')

const router = express.Router()

router.get('/', ctrlr.getAll)

router.get('/:contactId', ctrlr.getById)

router.post('/', validateBody(schemas.contactSchema), ctrlr.add)

router.delete('/:contactId', ctrlr.deleteById)

router.put('/:contactId', validateBody(schemas.contactSchema), ctrlr.updateById)

module.exports = router
