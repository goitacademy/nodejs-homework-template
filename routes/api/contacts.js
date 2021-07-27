const express = require('express');
const router = express.Router();

const { contacts: ctrl } = require('../../controllers');
console.log(ctrl, 'done');

const { validateMiddleware } = require('../../middleware');
const {
  contact: { validateContact },
} = require('../../model/schemas');

router.get('/', ctrl.listContacts);

router.get('/:contactId', ctrl.getContactById);

router.post(
  '/',
  express.json(),
  validateMiddleware(validateContact),
  ctrl.addContact,
);

router.delete('/:contactId', ctrl.removeContact);

router.patch('/:contactId', express.json(), ctrl.updateContact);

router.patch('/:contactId/favorite', express.json(), ctrl.updateStatusContact);

module.exports = router;
