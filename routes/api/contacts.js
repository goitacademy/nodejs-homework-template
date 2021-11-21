const express = require('express')
const router = express.Router()
const { controllerWrapper, validator } = require('../../middlewares')
const { contactsSchema } = require('../../schemas')
const { contacts: ctrl } = require('../../controllers')
// const { contacts } = require('../../contactsOperations')

router.get('/', controllerWrapper(ctrl.listContacts))
router.get('/:contactId', controllerWrapper(ctrl.getContactById))

router.post('/', validator(contactsSchema), controllerWrapper(ctrl.addContact))

router.delete('/:contactId', controllerWrapper(ctrl.removeContactById))

router.put(
  '/:contactId',
  validator(contactsSchema),
  controllerWrapper(ctrl.updateContactById)
)

module.exports = router
