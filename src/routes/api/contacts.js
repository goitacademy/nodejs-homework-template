const express = require('express');

const {
  addContactValidation,
  putContactValidation,
} = require('../../middlewares/validationMiddleware');

const {tryCatchWrapper} = require('../../helpers');

const {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  putContact,
} = require('../../controllers/contactsController');

const router = new express.Router();

router.get('/', tryCatchWrapper(getContacts));

router.get('/:id', tryCatchWrapper(getContactById));

router.post('/', addContactValidation, tryCatchWrapper(postContact));

router.delete('/:id', tryCatchWrapper(deleteContact));

router.put('/:id', putContactValidation, tryCatchWrapper(putContact));

module.exports = router;
