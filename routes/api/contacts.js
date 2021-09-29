const express = require('express')

const { joiSchema, updateFavoriteSchema } = require('../../models/contacts')
const { controllerWrapper, validation } = require('../../middlewares')
const ctrl = require('../../controllers/contacts/index')
const router = express.Router()

router.get('/', controllerWrapper(ctrl.getAllContacts))

router.get('/:contactId', controllerWrapper(ctrl.getByIdContacts))

router.post('/', validation(joiSchema), controllerWrapper(ctrl.addContacts))

router.put(
  '/:contactId',
  validation(joiSchema),
  controllerWrapper(ctrl.updateByIdContacts),
)

router.patch(
  '/:contactId/favorite',
  validation(updateFavoriteSchema),
  controllerWrapper(ctrl.updateActive),
)
router.delete('/:contactId', controllerWrapper(ctrl.removeByIdContacts))

module.exports = router
