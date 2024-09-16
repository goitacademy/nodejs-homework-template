const express = require('express');
const {
  getAllContacts,
  updateContact,
  getContact,
  deleteContact,
  createContact,
  updateContactFavorite,
} = require('../../controllers/contactController');


const router = express.Router();

router.get('/', getAllContacts)

router.get('/:contactId', getContact)

router.post('/', createContact);

router.delete('/:contactId', deleteContact);

router.put('/:contactId', updateContact);

router.patch('/:contactId/favorite', updateContactFavorite);

module.exports = router;
