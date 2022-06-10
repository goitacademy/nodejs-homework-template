const express = require('express')
const contactsRouter = express.Router()

const { validation } = require('../../middlewares/validationMiddleware')
const controllerWrapper = require('../../middlewares/controllerWrapper')
const { authenticate } = require('../../middlewares/authenticate')

const {
  joiContactSchema,
  joiFavoriteSchema,
} = require('../../model/contacts')

const {
  getContacts,
  getContactFromId,
  addContacts,
  deleteContact,
  changeContact,
  updateStatusContact,
} = require('../../controllers/contactsControllers')

contactsRouter.get('/', authenticate, controllerWrapper(getContacts))

contactsRouter.get('/:contactId', authenticate, controllerWrapper(getContactFromId))

contactsRouter.post(
  '/',
  authenticate,
  validation(joiContactSchema),
  controllerWrapper(addContacts)
)

contactsRouter.delete('/:contactId', authenticate, controllerWrapper(deleteContact))

contactsRouter.put(
  '/:contactId',
  authenticate,
  validation(joiContactSchema),
  controllerWrapper(changeContact)
)

contactsRouter.patch(
  '/:contactId/favorite',
  authenticate,
  validation(joiFavoriteSchema),
  controllerWrapper(updateStatusContact)
)

module.exports = contactsRouter