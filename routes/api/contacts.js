const express = require('express');
const { contactsController } = require('../../controllers');
const { validation, userAuthorization } = require('../../middlewares');
const { joiSchema, statusJoiSchema } = require('../../models/contact');

const router = express.Router();

router.get('/', userAuthorization, contactsController.getContactsList);

router.get('/:contactId', contactsController.getContactById);

router.post('/', userAuthorization, validation(joiSchema), contactsController.postAddContacts);

router.delete('/:contactId', contactsController.removeContactsById);

router.put('/:contactId', validation(joiSchema), contactsController.updateContactsById);

router.patch('/:contactId/favorite', validation(statusJoiSchema), contactsController.updateStatusContact);

module.exports = router;
