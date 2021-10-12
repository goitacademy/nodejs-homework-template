const express = require('express');
const { contactJoiSchema, updateContactJoiSchema, updateFavoriteJoiSchema } = require('../../models/contact');
const { controllerWrapper, validation, authentication } = require('../../middlewares/');
const { contacts: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', authentication, controllerWrapper(ctrl.listContacts));

router.get('/:contactId', authentication, controllerWrapper(ctrl.getContactById));

router.post('/', authentication, validation(contactJoiSchema), controllerWrapper(ctrl.addContact));

router.delete('/:contactId', authentication, controllerWrapper(ctrl.removeContact));

router.put('/:contactId', authentication, validation(updateContactJoiSchema), controllerWrapper(ctrl.updateContact));

router.patch('/:contactId/favorite', authentication, validation(updateFavoriteJoiSchema), controllerWrapper(ctrl.updateFavoriteStatus));

router.get('/contacts?favorite=true', authentication, controllerWrapper(ctrl.filterByFavorite));

module.exports = router;
