const express = require('express')
const router = express.Router()

const { joiContactSchema } = require('../../schemas/contacts')
const validation = require('../../middlewares/validation')
const controllerWrapper = require('../../controllers/controllerWrapper')
const {
  getContactsController,
  getContactByIdController,
  addContactsController,
  updateContactController,
  updateStatusContactController,
  deleteContactController,
} = require('../../controllers/contactsControllers')

router.get('/', controllerWrapper(getContactsController))

router.get('/:contactId', controllerWrapper(getContactByIdController))

router.post('/', validation(joiContactSchema), controllerWrapper(addContactsController))

router.patch('/:contactId', controllerWrapper(updateContactController))

router.patch('/:contactId/favorite', controllerWrapper(updateStatusContactController))

router.delete('/:contactId', controllerWrapper(deleteContactController))

module.exports = router
