const express = require('express');
const {
  addContactValidation,
  addFavoriteValidation,
} = require('../../middlewares/validationMiddleware');
const {
  getContacts,
  getOneContactById,
  addNewContact,
  deleteContact,
  changeOldContact,
  updateFavorite,
} = require('../../controllers/contactsController');

const router = express.Router();

router.get('/', getContacts);

router.get('/:contactId', getOneContactById);

router.post('/', addContactValidation, addNewContact);

router.delete('/:contactId', deleteContact);

router.put('/:contactId', addContactValidation, changeOldContact);

router.patch('/:contactId/favorite', addFavoriteValidation, updateFavorite);

module.exports = router;
