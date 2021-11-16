const express = require('express');
const router = express.Router();

const {
  getContacts,
  getContactById,
  postContact,
  putContact,
  deleteContact,
} = require('../../controllers/contactsController');

const {
  getContactByIdValidation,
  postContactValidation,
  putContactValidation,
} = require('../../middlewares/validator/validator');

router.get('/contacts', getContacts);
router.get('/contacts/:contactId', getContactByIdValidation, getContactById);
router.post('/contacts', postContactValidation, postContact);
router.put('/contacts/:contactId', putContactValidation, putContact);
router.delete('/contacts/:contactId', deleteContact);

module.exports = router;
