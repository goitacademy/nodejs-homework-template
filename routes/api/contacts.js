const express = require('express');
const { validation, ctrlWrapper, authMiddleware } = require('../../middlewares');
const { contactJoiSchema, statusJoiSchema } = require('../../models/contacts');
const ctrl = require("../../controllers/contactsCtrl");

const router = express.Router();

router.get('/', authMiddleware, ctrlWrapper(ctrl.listContacts));

router.get('/:contactId', ctrlWrapper(ctrl.getContactById));

router.post('/', authMiddleware, validation(contactJoiSchema), ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', ctrlWrapper(ctrl.removeContact));

router.put('/:contactId', validation(contactJoiSchema), ctrlWrapper(ctrl.updateContact));

router.patch('/:contactId/favorite', validation(statusJoiSchema), ctrlWrapper(ctrl.updateStatusContact))


module.exports = router;

