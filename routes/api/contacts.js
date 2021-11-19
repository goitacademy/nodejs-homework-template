const express = require('express')

const { contacts: ctrl } = require('../../controllers')
const { controllerWrapper } = require('../../middleware/wrapper')
const { validation } = require('../../middleware/validation')
const { authenticate } = require('../../middleware/authenticate')
const { joiSchema } = require('../../models/contact')

const router = express.Router()

router.get('/', authenticate, controllerWrapper(ctrl.listContacts))

router.get('/:id', authenticate, controllerWrapper(ctrl.getByIdContact))

router.post(
  '/',
  authenticate,
  validation(joiSchema),
  controllerWrapper(ctrl.addContact),
)

router.delete('/:id', authenticate, controllerWrapper(ctrl.removeContact))

router.put(
  '/:id',
  authenticate,
  validation(joiSchema),
  controllerWrapper(ctrl.updateContact),
)

router.patch(
  '/:id/favorite',
  authenticate,
  controllerWrapper(ctrl.changeFavorite),
)

module.exports = router
