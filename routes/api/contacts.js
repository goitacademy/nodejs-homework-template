const express = require('express');

const ctrl = require('../../controllers/contacts');
const { validateBody, isIdValid } = require('../../middlewares');
const { schema } = require('../../models/contact');

const router = express.Router();

router.get('/', ctrl.listContacts);

router.get('/:id', isIdValid, ctrl.getContactById);

router.post('/', validateBody(schema.addContact), ctrl.addContact);

router.put('/:id', isIdValid, validateBody(schema.updateContact), ctrl.updateContact);

router.patch(
  '/:id/favorite',
  isIdValid,
  validateBody(schema.updateStatusContact),
  ctrl.updateStatusContact,
);

router.delete('/:id', isIdValid, ctrl.removeContact);

module.exports = router;
