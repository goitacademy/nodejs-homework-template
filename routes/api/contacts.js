const express = require('express')
const { contactSchema } = require('../../schemas')
const { controllerWrapper, validation } = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers')
console.log(ctrl)

const router = express.Router()

router.get('/', controllerWrapper(ctrl.listContacts))

router.get('/:contactId', controllerWrapper(ctrl.getContactById))

router.post('/', validation(contactSchema), controllerWrapper(ctrl.addContact))

router.delete('/:contactId', controllerWrapper(ctrl.removeContact))

router.put(
  '/:contactId',
  validation(contactSchema),
  controllerWrapper(ctrl.updateById)
)

module.exports = router
