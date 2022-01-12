const express = require('express')
const router = express.Router()
const {controllerWrapper, validation} = require("../../middlewares");
const contactsController = require('../../controllers/contacts')
const {contactJoiSchema, updateFavoriteJoiSchema} = require("../../models/contact");

router.get('/', controllerWrapper(contactsController.getAll))

router.get('/:id', controllerWrapper(contactsController.getContactById))

router.post('/', validation(contactJoiSchema), controllerWrapper(contactsController.addContact))

router.delete('/:id', controllerWrapper(contactsController.removeContact))

router.put('/:id', validation(contactJoiSchema), controllerWrapper(contactsController.updateContact))

router.patch('/:id/favorite', validation(updateFavoriteJoiSchema), controllerWrapper(contactsController.updateStatusContact))

module.exports = router
