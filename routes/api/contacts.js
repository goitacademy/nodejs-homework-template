const express = require('express');
const router = express.Router();
const {
  schemaValidator,
  isValidId,
  isBodyNotEmpty,
} = require('../../middlewares');
const { contacts: ctrl } = require('../../controllers');
router.get('/', schemaValidator, ctrl.getContacts);

router.get('/:id', ctrl.getContactById);

router.post('/', isBodyNotEmpty(), schemaValidator, ctrl.addContact);

router.delete('/:id', isValidId, ctrl.removeContact);

router.put(
  '/:id',
  isValidId,
  isBodyNotEmpty(),
  schemaValidator,
  ctrl.updateContact
);
router.patch(
  '/:id/favorite',
  isValidId,
  isBodyNotEmpty('Missing favorite field'),
  schemaValidator,
  ctrl.updateStatus
);

module.exports = router;
