const express = require('express')

const ctrl = require('../../controllers/contacts')

const {validateBody} =require('../../middelwares')
const schemas = require('../../schemas/contacts')

const router = express.Router()

router.get('/', ctrl.getAll )

router.get('/:id', ctrl.getById )

router.post('/', validateBody(schemas.addSchemas), ctrl.addContact)

router.delete('/:id', ctrl.deleteById)

router.put('/:id', validateBody(schemas.addSchemas), ctrl.updateById)

module.exports = router
