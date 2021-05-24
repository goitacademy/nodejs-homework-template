const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/contacts');
const guard = require('../../../helpers/guard');

const {
  validateCreate,
  validateUpdate,
  validateUpdateStatus,
} = require('./validation');

router.get('/', guard, ctrl.listContacts);

router.get('/:contactId', guard, ctrl.getContactById);

router.post('/', guard, validateCreate, ctrl.addContact);

router.delete('/:contactId', guard, ctrl.removeContact);

router.put('/:contactId', guard, validateUpdate, ctrl.updateContact);

router.patch(
  '/:contactId/favorite',
  guard,
  validateUpdateStatus,
  ctrl.updateStatusContact,
);

module.exports = router;
