const express = require('express')
const {validateBody} = require('../../middlewares')
const {schema} = require('../../schemas/contacts')

const ctrl = require('../../controllers/contacts')

const router = express.Router()

router.get('/', ctrl.getAll)

router.get('/:contactId', ctrl.getById)

router.post('/', validateBody(schema, "missing required name field"), ctrl.add)

router.delete('/:contactId', ctrl.deleteById)

router.put('/:contactId',validateBody(schema, "missing fields"), ctrl.updateById)

module.exports = router
