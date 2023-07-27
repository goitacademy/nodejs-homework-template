const express = require('express');

const isValidId = require('../../middlewares/isValidId');

const {validateData} = require('../../middlewares/validateData');

const {schemas} = require('../../models/contact');

const router = express.Router();

const { getContactList,
  getOneContact,
  addNewContact,
  deleteContact,
  updateContactById,
  updateStatusContact } = require('../../controllers/contacts');

router.get('/', getContactList);

router.get('/:contactId', isValidId, getOneContact);

router.post('/', validateData(schemas.addContactSchema), addNewContact);

router.delete('/:contactId', isValidId, deleteContact);

router.put('/:contactId', isValidId, validateData(schemas.addContactSchema), updateContactById);

router.patch('/:contactId/favorite', isValidId, validateData(schemas.updateFavoriteSchema),  updateStatusContact)

module.exports = router;
