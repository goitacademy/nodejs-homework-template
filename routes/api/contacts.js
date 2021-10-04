const express = require('express')
const router = express.Router()
const { controllerWrapper, validation } = require('../../middelwares')
const { contactSchema } = require('../../schemas')
const { contacts: ctrl } = require('../../controllers')

router.get('/', controllerWrapper(ctrl.getAll))

router.get('/:contactId', controllerWrapper(ctrl.getById))

router.post('/', validation(contactSchema), controllerWrapper(ctrl.add))

router.delete('/:contactId', controllerWrapper(ctrl.remove))

router.put('/:contactId', validation(contactSchema), controllerWrapper(ctrl.updateById))

module.exports = router
