const express = require('express');

const { validateMiddleware } = require('../../middleware');
const router = express.Router();
const {
  contact: { validateContact },
} = require('../../model/schemas');

const { contacts: ctrl } = require('../../controllers');

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
