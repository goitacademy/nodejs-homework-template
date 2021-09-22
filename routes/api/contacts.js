const express = require('express')

const { contacts: ctrl } = require('../../controllers')

const { controllerWrapper, validation } = require('../../middelwares')
const { contactShema } = require('../../schemas')

const router = express.Router()

router.get('/', controllerWrapper(ctrl.listContacts))

router.get('/:contactId', controllerWrapper(ctrl.getContactById))

router.post('/', validation(contactShema), controllerWrapper(ctrl.addContact))

router.delete('/:contactId', controllerWrapper(ctrl.removeContact))

router.put(
  '/:contactId',
  validation(contactShema),
  controllerWrapper(ctrl.updateById),
)

module.exports = router
