const express = require('express');
const {
  postContactValidation,
  putValidation,
  patchValidation,
  auth,
} = require('../../middlewares/index');
const {
  getContacts,
  getContactByIdController,
  postContact,
  deleteContact,
  putContact,
  patchContact,
} = require('../../controllers/index');

const router = express.Router();

router.get('/', auth, getContacts);

router.get('/:contactId', getContactByIdController);

router.post('/', auth, postContactValidation, postContact);

router.delete('/:contactId', deleteContact);

router.put('/:contactId', putValidation, putContact);

router.patch('/:contactId/favorite', auth, patchValidation, patchContact);

module.exports = router;
