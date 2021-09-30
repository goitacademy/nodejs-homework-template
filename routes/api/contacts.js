const express = require('express')

const { controllerWrapper, validation } = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers/contacts')
const { joiSchema, updateFavouriteJoiSchema } = require('../../models')

const router = express.Router()

router.get('/', controllerWrapper(ctrl.listContacts))

router.get('/:contactId', controllerWrapper(ctrl.getById))

router.post('/', validation(joiSchema), controllerWrapper(ctrl.add))

router.delete('/:contactId', controllerWrapper(ctrl.removeById))

router.put('/:contactId', validation(joiSchema), controllerWrapper(ctrl.updateById))

router.patch('/:contactId', validation(updateFavouriteJoiSchema), controllerWrapper(ctrl.updateStatusContact))

module.exports = router
