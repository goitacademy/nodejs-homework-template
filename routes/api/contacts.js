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
const {asyncWrapper} = require('../../helpers');

const router = express.Router();

router.get('/', getContacts);

router.get('/:contactId',
    checkIdInContact,
    asyncWrapper(getContactById));

router.delete('/:contactId',
    checkIdInContact,
    asyncWrapper(deleteContact));

router.post('/',
    [addContactValidation, checkFieldInContact],
    asyncWrapper(postContact));

router.patch('/:contactId',
    [updateContactValidation, checkIdInContact, checkFieldInContact],
    asyncWrapper(updateContact));

router.patch('/:contactId/favorite',
    [checkIdInContact, updateStatusContactValidation],
    asyncWrapper(updateStatusContact));

module.exports = router;
