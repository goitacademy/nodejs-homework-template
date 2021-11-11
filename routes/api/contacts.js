const express = require('express')
const router = express.Router()
const { contacts: controllers } = require('../../controllers')
const { validation, controllerWrapper } = require('../../middlewares')
const { joiSchemaAdd, joiSchemaPut } = require('../../models/contact')

router.get('/', controllerWrapper(controllers.getAll))

router.get('/:contactId', controllerWrapper(controllers.getById))

router.post('/', validation(joiSchemaAdd), controllerWrapper(controllers.add))

router.delete('/:contactId', controllerWrapper(controllers.removeById))

router.put(
  '/:contactId',
  validation(joiSchemaPut),
  controllerWrapper(controllers.updateById)
)

router.patch(
  '/:contactId/favorite',
  controllerWrapper(controllers.updaateFavorite)
)

module.exports = router
