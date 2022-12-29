const express = require('express');

const {
  addContactValidation,
  putContactValidation,
} = require('../../middlewares/validationMiddleware');

const {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  putContact,
} = require('../../controllers/contactsController');

const router = new express.Router();

router.get('/', getContacts);

router.get('/:id', getContactById);

router.post('/', addContactValidation, postContact);

router.delete('/:id', deleteContact);

router.put('/:id', putContactValidation, putContact);

module.exports = router;
