const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/contacts');
const guard = require('../../../helpers/guard');
const {
  schemaCreateContact,
  schemaUpdateContact,
  schemaStatusContact,
} = require('./validation');

router.get('/', guard, ctrl.getAll);

router.get('/:contactId', guard, ctrl.getById);

router.post('/', guard, schemaCreateContact, ctrl.create);

router.delete('/:contactId', guard, ctrl.remove);

router.put('/:contactId', guard, schemaUpdateContact, ctrl.update);

router.patch('/:contactId/favorite', guard, schemaStatusContact, ctrl.update);

module.exports = router;
