const express = require('express')

const { contactSchema } = require('../../schemas')
const { controllerWrapper, validation } = require('../../middelwares')
const ctrl = require('../../controllers/contacts/index')
const router = express.Router()

router.get('/', controllerWrapper(ctrl.getAllContacts))

router.get('/:contactId', controllerWrapper(ctrl.getByIdContacts))

router.post('/', validation(contactSchema), controllerWrapper(ctrl.addContacts))

router.put(
  '/:contactId',
  validation(contactSchema),
  controllerWrapper(ctrl.updateByIdContacts),
)
router.delete('/:contactId', controllerWrapper(ctrl.removeByIdContacts))

module.exports = router
