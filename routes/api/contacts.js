const express = require('express');
const router = express.Router();

const { contacts: ctrl } = require('../../controllers/contacts');

const { validateMiddleware } = require('../../middleware');
const {
  contact: { validateContact },
} = require('../../model/schemas');

router.get('/', ctrl.listContact);

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
