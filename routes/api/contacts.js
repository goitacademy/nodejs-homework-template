const express = require('express')
const { joiSchema, JoiUpdateFavoriteSchema } = require('../../models/contacts')
const { controllerWrapper, validation } = require('../../middlewares')
const contactsController = require('../../controllers/contacts')
const router = express.Router()

router.get('/', controllerWrapper(contactsController.getContacts))

router.get('/:id', controllerWrapper(contactsController.getContactById))

router.post('/', validation(joiSchema), controllerWrapper(contactsController.addContact))

router.put('/:id', validation(joiSchema), controllerWrapper(contactsController.updateContactsById))

router.patch('/:id/favorite', validation(JoiUpdateFavoriteSchema), controllerWrapper(contactsController.updateFavorite))

router.delete('/:id', controllerWrapper(contactsController.removeContact))

module.exports = router
