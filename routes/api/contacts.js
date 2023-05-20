const express = require('express');
const {getContacts, getContactById, addContact, deleteContact, updateContact} = require('../../controllers/contactControllers')
const router = express.Router();

const validateBody = require('../../decorators/validateBody')
const {contactValidationSchema} = require('../../schemas/contactValidationSchema')

router
  .route('/')
  .get(getContacts)
  .post(validateBody(contactValidationSchema), addContact)

router
  .route('/:contactId')
  .get(getContactById)
  .delete(deleteContact)
  .put(updateContact)

module.exports = router
