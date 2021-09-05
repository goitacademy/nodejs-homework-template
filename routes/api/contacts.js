const express = require('express');
const ctrl = require('../controllers/contacts');
const {
  JoiSchemaAddContact,
  JoiSchemaUpdateContact,
} = require('../../models/contact');
const { validationMiddleware } = require('../../middlewares');
const router = express.Router();

router.get('/', ctrl.listContacts);

router.get('/:contactId', ctrl.getContactById);

router.post('/', validationMiddleware(JoiSchemaAddContact), ctrl.addContact);

router.delete('/:contactId', ctrl.removeContact);

router.put(
  '/:contactId',
  validationMiddleware(JoiSchemaUpdateContact),
  ctrl.updateContact,
);

router.patch('/:contactId/favorite', ctrl.updateStatusContact);

module.exports = router;
