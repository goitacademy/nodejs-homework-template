const express = require('express');
const {getContacts, 
  getContactById, 
  addContact, 
  deleteContact, 
  updateContact, 
  updateStatusContact} = require('../../controllers/contactControllers')
const router = express.Router();

const validateBody = require('../../decorators/validateBody')
const {contactValidationSchema, 
  updateContactValidationSchema, 
  updateFavoriteSchema} = require('../../schemas/contactValidationSchema')

router
  .route('/')
  .get(getContacts)
  .post(validateBody(contactValidationSchema), addContact)

router
  .route('/:contactId')
  .get(getContactById)
  .delete(deleteContact)
  .put(validateBody(updateContactValidationSchema), updateContact)
  
  
router
  .route('/:contactId/favorite')
  .patch(validateBody(updateFavoriteSchema), updateStatusContact)

module.exports = router
