const express = require('express')

const { controllerWrapper, validation } = require('../../middlewares');
const { joiSchema } = require('../../models/contacts/contact');
const { contacts: ctrl } = require('../../controllers/contacts')

const router = express.Router()

router.get('/', controllerWrapper(ctrl.listContacts))

router.get('/:contactId', controllerWrapper(ctrl.getContactById))

router.post('/', validation(joiSchema), controllerWrapper(ctrl.addContact))

router.delete('/:contactId', controllerWrapper(ctrl.removeContact))

router.put('/:contactId', validation(joiSchema), controllerWrapper(ctrl.updateById))

router.patch('/:contactId/favorite', controllerWrapper(ctrl.updateStatusContact))

module.exports = router
