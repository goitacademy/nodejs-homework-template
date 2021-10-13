const express = require('express');
const router = express.Router();

const { controllerWrapper, validation, authenticate } = require('../../middlewares');
const {contactsController: ctrl} = require('../../controllers');
const { joiSchema, updateFavoriteJoiSchema } = require('../../models/contact');

router.get('/', authenticate, controllerWrapper(ctrl.listContacts));

router.get('/:contactId', authenticate, controllerWrapper(ctrl.getContactById));

router.post('/', authenticate, validation(joiSchema), controllerWrapper(ctrl.addContact));

router.delete('/:contactId', authenticate, controllerWrapper(ctrl.removeContact));

router.put('/:contactId', authenticate, validation(joiSchema), controllerWrapper(ctrl.updateContact));

router.patch("/:contactId", authenticate, validation(updateFavoriteJoiSchema), controllerWrapper(ctrl.updateFavoriteContact));

module.exports = router;