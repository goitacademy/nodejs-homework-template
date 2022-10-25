const express = require('express');
const { validation, ctrlWrapper } = require('../../middlewares/index');
const { joiSchema, statusJoiSchema } = require('../../models/contacts');
const { contactsCtrl: ctrl } = require('../../controllers');

const validationMiddleware = validation(joiSchema);
const statusValidationMiddleware = validation(statusJoiSchema);

const router = express.Router()

router.get('/', ctrlWrapper(ctrl.listContacts));
router.get('/:contactId', ctrlWrapper(ctrl.getContactById));
router.post('/', validationMiddleware, ctrlWrapper(ctrl.addContact));
router.delete('/:contactId', ctrlWrapper(ctrl.removeContact));
router.put('/:contactId', validationMiddleware, ctrlWrapper(ctrl.updateContact));
router.patch('/:contactId/favorite', statusValidationMiddleware, ctrlWrapper(ctrl.updateStatusContact))

module.exports = router;
