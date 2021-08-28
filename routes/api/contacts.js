const express = require('express')
const router = express.Router()

const { validation } = require('../../middlewares')
const { joiContactSchema } = require('../../model')
const { contacts: ctrl } = require('../../controllers')

const validationMiddleware = validation(joiContactSchema)

router.get('/', ctrl.getAll)

router.get('/:contactId', ctrl.getById)

router.post('/', validationMiddleware, ctrl.add)

router.delete('/:contactId', ctrl.remove)

router.put('/:contactId', validationMiddleware, ctrl.update)

router.patch('/:contactId/favorite', ctrl.updateStatus)

module.exports = router
