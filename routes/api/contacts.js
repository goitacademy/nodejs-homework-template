const express = require('express')

const { contactSchema } = require('../../schemas')
const { controllerWrapper, validation } = require('../../middelwares')
const { contacts: ctrl } = require('../../controllers')
const router = express.Router()

router.get('/', controllerWrapper(ctrl.getAll))

router.get('/:contactId', controllerWrapper(ctrl.getById))

router.post('/', validation(contactSchema), controllerWrapper(ctrl.add))

router.put(
  '/:contactId',
  validation(contactSchema),
  controllerWrapper(ctrl.updateById),
)
router.delete('/:contactId', controllerWrapper(ctrl.removeById))

module.exports = router
