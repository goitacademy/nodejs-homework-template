const express = require('express');

const ctrl = require('../../controllers/contacts');
const { validateBody, isIdValid, authenticate } = require('../../middlewares');
const { schema } = require('../../models/contact');

const router = express.Router();

router.get('/', authenticate, ctrl.listContacts);

router.get('/:id', authenticate, isIdValid, ctrl.getContactById);

router.post('/', authenticate, validateBody(schema.addContact), ctrl.addContact);

router.put('/:id', authenticate, isIdValid, validateBody(schema.updateContact), ctrl.updateContact);

router.patch(
  '/:id/favorite',
  authenticate,
  isIdValid,
  validateBody(schema.updateStatusContact),
  ctrl.updateStatusContact,
);

router.delete('/:id', authenticate, isIdValid, ctrl.removeContact);

module.exports = router;
