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

const asyncWrapper = require('../../helpers/handleHttpError');

const router = express.Router();

router.get('/', asyncWrapper(getContacts));

router.get('/:contactId', asyncWrapper(getOneContactById));

router.post('/', addContactValidation, asyncWrapper(addNewContact));

router.delete('/:contactId', asyncWrapper(deleteContact));

router.put('/:contactId', addContactValidation, asyncWrapper(changeOldContact));

router.patch('/:contactId/favorite', addFavoriteValidation, asyncWrapper(updateFavorite));

module.exports = router;
