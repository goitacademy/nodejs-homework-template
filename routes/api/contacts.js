const express = require('express')

const { joiSchema, updateFavoriteJoiSchema } = require('../../models/contact')
const { controllerWrapper, validation } = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/', controllerWrapper(ctrl.getAll))

router.get('/:contactId', controllerWrapper(ctrl.getById))

router.post('/', validation(joiSchema), controllerWrapper(ctrl.add))

router.put('/:contactId', validation(joiSchema), controllerWrapper(ctrl.updateById))

router.patch('/:contactId/favorite', validation(updateFavoriteJoiSchema), controllerWrapper(ctrl.updateFavorite))

router.delete('/:contactId', controllerWrapper(ctrl.removeById))

module.exports = router
