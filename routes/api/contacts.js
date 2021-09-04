const express = require('express')
const router = express.Router()

const { validation, authenticate } = require('../../middlewares')
const { joiContactSchema } = require('../../model')
const { contacts: ctrl } = require('../../controllers')

const validationMiddleware = validation(joiContactSchema)

router.get('/', authenticate, ctrl.getAll)

router.get('/:contactId', ctrl.getById)

router.post('/', authenticate, validationMiddleware, ctrl.add)

router.delete('/:contactId', ctrl.remove)

router.put('/:contactId', authenticate, validationMiddleware, ctrl.update)

router.patch('/:contactId/favorite', ctrl.updateStatus)

module.exports = router
