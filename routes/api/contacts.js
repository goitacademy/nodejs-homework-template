const express = require('express');
const {
  getContactsController,
  getContactByIDController,
  postContactController,
  deleteContactController,
  putContactController,
  updateStatusContactController,
} = require('../../controllers/contacts');

const router = express.Router();

router.get('/', getContactsController);

router.get('/:contactId', getContactByIDController);

router.post('/', postContactController);

router.delete('/:contactId', deleteContactController);

router.put('/:contactId', putContactController);

router.patch('/:contactId/favorite', updateStatusContactController);

module.exports = router;
