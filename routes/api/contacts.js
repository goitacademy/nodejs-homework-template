const express = require('express')

const { joiContactSchema } = require('../../model/contact')
const { validation, authenticate, controllerWrapper } = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers')
const router = express.Router()

router.get('/', controllerWrapper(authenticate), ctrl.listContacts)

router.get('/:id', controllerWrapper(authenticate), ctrl.getContactById)

router.post('/', controllerWrapper(authenticate), validation(joiContactSchema), controllerWrapper(ctrl.addContact))

router.delete('/:id', controllerWrapper(authenticate), ctrl.removeContact)

router.put('/:id', controllerWrapper(authenticate), validation(joiContactSchema), controllerWrapper(ctrl.updateContact))

router.patch('/:id/favorite', controllerWrapper(authenticate), controllerWrapper(ctrl.updateFavorite))

module.exports = router
