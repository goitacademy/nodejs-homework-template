const express = require('express')

const {
  validation400,
  authenticate,
  controllerWrapper,
} = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers')
const { contactJoiSchema } = require('../../model/contact')

const router = express.Router()

router.get('/', authenticate, controllerWrapper(ctrl.getAll))

router.get('/:contactId', authenticate, controllerWrapper(ctrl.getContactId))

router.post(
  '/',
  authenticate,
  validation400(contactJoiSchema),
  controllerWrapper(ctrl.postContact)
)

router.delete(
  '/:contactId',
  authenticate,
  controllerWrapper(ctrl.deleteContact)
)

router.put(
  '/:contactId',
  authenticate,
  validation400(contactJoiSchema),
  controllerWrapper(ctrl.selectedContact)
)

router.patch(
  '/:contactId/favorite',
  authenticate,
  controllerWrapper(ctrl.putContact)
)

module.exports = router
