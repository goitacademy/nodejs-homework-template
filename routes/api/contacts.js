const express = require('express');
const {
  getContacts,
  getContactById,
  deleteContact,
  postContact,
  updateContact,
  updateStatusContact,
} = require('../../controller');
const {
  addContactValidation,
  updateContactValidation,
  checkFieldInContact,
  checkIdInContact,
  updateStatusContactValidation,
} = require('../../middlewares');

const router = express.Router();

router.get('/', getContacts);

router.get('/:contactId', checkIdInContact, getContactById);

router.delete('/:contactId', checkIdInContact, deleteContact);

router.post('/',
    [addContactValidation, checkFieldInContact],
    postContact);

router.patch('/:contactId',
    [updateContactValidation, checkIdInContact, checkFieldInContact],
    updateContact);

router.patch('/:contactId/favorite',
    [checkIdInContact, updateStatusContactValidation],
    updateStatusContact);

module.exports = router;
