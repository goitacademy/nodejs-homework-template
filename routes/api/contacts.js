const express = require('express')

const {joiSchema, updateFavoriteJoiSchema} = require('../../models/contact')
const {controllerWrapper, validation} = require('../../middlewares');
const {products: ctrl} = require('../../controllers');

const router = express.Router()

router.get('/', controllerWrapper(ctrl.listContacts))

router.get('/:contactId', controllerWrapper(ctrl.getContactById))

router.post('/', validation(joiSchema), controllerWrapper(ctrl.addContact))

router.put('/:contactId', validation(joiSchema), controllerWrapper(ctrl.updateContacts))

router.patch('/:contactId/favorite', validation(updateFavoriteJoiSchema), controllerWrapper(ctrl.updateStatusContact))

router.delete('/:contactId', controllerWrapper(ctrl.removeContact))

module.exports = router
