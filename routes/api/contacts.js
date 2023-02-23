const express = require('express');
const router = express.Router();
const {
  schemaValidator,
  isValidId,
  isBodyNotEmpty,
  authCheckValid,
} = require('../../middlewares');
const { contacts: ctrl } = require('../../controllers');
router.get('/', authCheckValid, schemaValidator, ctrl.getContacts);

router.get('/:id', isValidId, authCheckValid, ctrl.getContactById);

router.post(
  '/',
  authCheckValid,
  isBodyNotEmpty(),
  schemaValidator,
  ctrl.addContact
);

router.delete('/:id', isValidId, ctrl.removeContact);

router.put(
  '/:id',
  isValidId,
  authCheckValid,
  isBodyNotEmpty(),
  schemaValidator,
  ctrl.updateContact
);
router.patch(
  '/:id/favorite',
  authCheckValid,
  isValidId,
  isBodyNotEmpty('Missing favorite field'),
  schemaValidator,
  ctrl.updateStatus
);

module.exports = router;
