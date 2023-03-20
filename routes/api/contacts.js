const express = require('express');
const {
  getContactsList,
  getById,
  addNewContact,
  deleteContact,
  updateContactById,
} = require('../../controllers/contactController');
const { bodyValidation } = require('../../middliwares');
const { asyncCatch } = require('../../utils');

const router = express.Router();

router.get('/', asyncCatch(getContactsList));

router.get('/:contactId', asyncCatch(getById));

router.post('/', bodyValidation, asyncCatch(addNewContact));

router.delete('/:contactId', asyncCatch(deleteContact));

router.put('/:contactId', bodyValidation, asyncCatch(updateContactById));

module.exports = router;
