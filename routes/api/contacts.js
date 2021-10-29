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
    asyncWrapper([checkIdInContact]),
    asyncWrapper(getContactById));

router.delete('/:contactId',
    asyncWrapper([checkIdInContact]),
    asyncWrapper(deleteContact));

router.post('/',
    asyncWrapper([addContactValidation, checkFieldInContact]),
    asyncWrapper(postContact));

router.patch('/:contactId',
    asyncWrapper([updateContactValidation, checkIdInContact, checkFieldInContact]),
    asyncWrapper(updateContact));

router.patch('/:contactId/favorite',
    asyncWrapper([checkIdInContact, updateStatusContactValidation]),
    asyncWrapper(updateStatusContact));

module.exports = router;
