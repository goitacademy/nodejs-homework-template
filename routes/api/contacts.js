const express = require('express')
const router = express.Router()

const { contacts: ctrl } = require('../../controllers')
const { joiContactSchema } = require('../../models/contact')
const {
  validation,
  aunthenticate,
  controllerWrapper,
} = require('../../middlewares')

const validationMiddleware = validation(joiContactSchema)

router.get(
  '/',
  controllerWrapper(aunthenticate),
  controllerWrapper(ctrl.listContacts),
)

router.get('/:contactId', ctrl.getContactById)

router.post(
  '/',
  controllerWrapper(aunthenticate),
  validationMiddleware,
  controllerWrapper(ctrl.addContact),
)

router.delete('/:contactId', ctrl.removeContact)

router.put('/:contactId', validationMiddleware, ctrl.updateContact)

router.patch('/:contactId/favorite', ctrl.updateFavorite)

module.exports = router
