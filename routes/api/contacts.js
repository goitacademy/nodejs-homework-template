const express = require('express');

const {
  isValidId,
  authenticate,
  validateData } = require('../../middlewares')

const {schemas} = require('../../models/contact');

const router = express.Router();

const { getContactList,
  getOneContact,
  addNewContact,
  deleteContact,
  updateContactById,
  updateStatusContact } = require('../../controllers/contacts');

router.get('/', authenticate, getContactList);

router.get('/:contactId', authenticate, isValidId, getOneContact);

router.post('/', authenticate, validateData(schemas.addContactSchema), addNewContact);

router.delete('/:contactId', authenticate, isValidId, deleteContact);

router.put('/:contactId', authenticate, isValidId, validateData(schemas.addContactSchema), updateContactById);

router.patch('/:contactId/favorite', authenticate, isValidId, validateData(schemas.updateFavoriteSchema),  updateStatusContact)

module.exports = router;
