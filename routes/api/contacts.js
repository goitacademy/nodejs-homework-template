const express = require('express')

const { joiContactSchema } = require('../../models/contact')
const { validation } = require('../../middlewares')

const ctrl = require('../../controllers/contacts')

const validationMiddleware = validation(joiContactSchema)

const router = express.Router()
router.get('/', ctrl.listContacts)

router.get('/:contactId', ctrl.getById)

router.post('/', validationMiddleware, ctrl.add)

router.put('/:contactId', validationMiddleware, ctrl.updateById)

router.delete('/:contactId', ctrl.delById)

module.exports = router
