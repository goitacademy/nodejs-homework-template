const express = require('express');
const router = new express.Router();

/*
const { validateBody } = require('../../middlewares');
const {
  validationCreateContact,
  validationUpdateContact,
  validationFavoriteContact,
} = require('../../service/validation');
*/

const {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  updateFavorite,
  removeContact,
} = require('../../controllers/contacts');

router.get('/', getContacts).post('/', addContact);
// .post('/', validateBody(validationCreateContact), addContact);

router
  .get('/:contactId', getContactById)
  .put('/:contactId', updateContact)
  .delete('/:contactId', removeContact);
// .put('/:contactId',validateBody(validationUpdateContact),  updateContact,)

router.patch('/:contactId/favorite', updateFavorite);
// .patch('/:contactId/favorite', validateBody(validationFavoriteContact), updateFavorite);

module.exports = router;
