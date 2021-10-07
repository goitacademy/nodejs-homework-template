const express = require('express');
const router = express.Router();

const { controllerWrapper, validation, authenticate } = require('../../middlewares');
const contactsController = require('../../controllers/contacts');
const { joiSchema, updateFavoriteJoiSchema } = require('../../models/contact');

router.get('/', authenticate, controllerWrapper(contactsController.listContacts));

router.get('/:contactId', authenticate, controllerWrapper(contactsController.getContactById));

router.post('/', authenticate, validation(joiSchema), controllerWrapper(contactsController.addContact));

router.delete('/:contactId', authenticate, controllerWrapper(contactsController.removeContact));

router.put('/:contactId', authenticate, validation(joiSchema), controllerWrapper(contactsController.updateContact));

router.patch("/:contactId", authenticate, validation(updateFavoriteJoiSchema), controllerWrapper(contactsController.updateFavoriteContact));

module.exports = router;
