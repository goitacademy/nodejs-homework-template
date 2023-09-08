const express = require('express')
const router = express.Router()

const ctrl = require('../../controllers/contacts')
const { validateBody, isValidId } = require('../../middlewars')
const schemas = require('../../schemas/contacts')

router.get('/', ctrl.getAll)

router.get('/:contactId', isValidId, ctrl.getById)

router.post('/', validateBody(schemas.addSchema), ctrl.add)

router.put('/:contactId', isValidId, ctrl.updateById)

router.delete('/:contactId', isValidId, ctrl.deleteById)

module.exports = router
