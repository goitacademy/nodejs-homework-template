const express = require('express');
const { contactJoiSchema, updateContactJoiSchema, updateFavoriteJoiSchema } = require('../../models/contact');
const { controllerWrapper, validation } = require('../../middlewares/');
const { contacts: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', controllerWrapper(ctrl.listContacts));

router.get('/:contactId', controllerWrapper(ctrl.getContactById));

router.post('/', validation(contactJoiSchema), controllerWrapper(ctrl.addContact));

router.delete('/:contactId', controllerWrapper(ctrl.removeContact));

router.put('/:contactId', validation(updateContactJoiSchema), controllerWrapper(ctrl.updateContact));

router.patch('/:contactId/favorite', validation(updateFavoriteJoiSchema), controllerWrapper(ctrl.updateFavoriteStatus));

module.exports = router;
