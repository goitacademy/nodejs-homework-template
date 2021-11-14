const express = require('express')
const router = express.Router()
const { contacts: controllers } = require('../../controllers')
const {
  validation,
  controllerWrapper,
  authenticate,
} = require('../../middlewares')
const { joiSchemaAdd, joiSchemaPut } = require('../../models/contact')

router.get('/', authenticate, controllerWrapper(controllers.getAll))

router.get('/:contactId', authenticate, controllerWrapper(controllers.getById))

router.post(
  '/',
  authenticate,
  validation(joiSchemaAdd),
  controllerWrapper(controllers.add)
)

router.delete(
  '/:contactId',
  authenticate,
  controllerWrapper(controllers.removeById)
)

router.put(
  '/:contactId',
  authenticate,
  validation(joiSchemaPut),
  controllerWrapper(controllers.updateById)
)

router.patch(
  '/:contactId/favorite',
  authenticate,
  controllerWrapper(controllers.updaateFavorite)
)

module.exports = router
