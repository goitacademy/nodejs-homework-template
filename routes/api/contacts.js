const express = require('express')
const router = express.Router()
const { validation } = require('../../middlewares')
const { contactSchema } = require('../../schemas')
const { contacts: ctrl } = require('../../controllers')

const validatMiddleware = validation(contactSchema)

router.get('/', ctrl.getAll)

router.get('/:id', ctrl.getById)

router.post('/', validatMiddleware, ctrl.add)

router.put('/:id', validatMiddleware, ctrl.updateById)

router.delete('/:id', ctrl.deleteById)

module.exports = router
