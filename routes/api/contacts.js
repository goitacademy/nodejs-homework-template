const express = require('express');
const router = express.Router();

const {
  getAll,
  getById,
  create,
  remove,
  update
} = require('../../controllers/contacts');

const {
  validateCreateContact,
  validateUpdateStatusContact,
  validateObjectId,
} = require('../../validation/contactsValidation');


const { asyncWrapper } = require('../../helpers/apiHelpers');

router.get('/', getAll)

router.get('/:contactId', validateObjectId, asyncWrapper(getById))

router.post('/', validateCreateContact, asyncWrapper(create))

router.delete('/:contactId', validateObjectId, asyncWrapper(remove))

router.put('/:contactId', validateObjectId, validateCreateContact, asyncWrapper(update))

router.patch('/:contactId', validateObjectId, validateUpdateStatusContact, asyncWrapper(update))

module.exports = router
