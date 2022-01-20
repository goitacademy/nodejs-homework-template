const express = require('express')
const router = express.Router()
const {
  controllerWrapper,
  validation,
  authenticate,
} = require('../../middlewares')
const contactsController = require('../../controllers/contacts')
const {
  contactJoiSchema,
  updateFavoriteJoiSchema,
} = require('../../models/contact')

router.get('/', authenticate, controllerWrapper(contactsController.getAll))

router.get(
  '/:id',
  authenticate,
  controllerWrapper(contactsController.getContactById),
)

router.post(
  '/',
  authenticate,
  validation(contactJoiSchema),
  controllerWrapper(contactsController.addContact),
)

router.delete(
  '/:id',
  authenticate,
  controllerWrapper(contactsController.removeContact),
)

router.put(
  '/:id',
  authenticate,
  validation(contactJoiSchema),
  controllerWrapper(contactsController.updateContact),
)

router.patch(
  '/:id/favorite',
  authenticate,
  validation(updateFavoriteJoiSchema),
  controllerWrapper(contactsController.updateStatusContact),
)

module.exports = router
