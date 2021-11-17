const express = require('express')

const { contacts: ctrl } = require('../../controllers')
const { controllerWrapper } = require('../../middleware/wrapper')
const { validation } = require('../../middleware/validation')
const { authenticate } = require('../../middleware/authenticate')
const { joiSchema } = require('../../models/contact')

const router = express.Router()

router.get('/', controllerWrapper(ctrl.listContacts))

router.get('/:id', controllerWrapper(ctrl.getByIdContact))

router.post(
  '/',
  authenticate,
  validation(joiSchema),
  controllerWrapper(ctrl.addContact),
)

router.delete('/:id', controllerWrapper(ctrl.removeContact))

router.put('/:id', validation(joiSchema), controllerWrapper(ctrl.updateContact))

router.patch('/:id/favorite', controllerWrapper(ctrl.changeFavorite))

module.exports = router
