const { Router } = require('express');

const { 
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact, 
} = require('../../models/contacts');

const { checkContactId, checkContactData} = require('../../middlewares/contactMiddleware');

const router = Router();

router.post('/', checkContactData, addContact);
router.get('/', listContacts);
router.get('/:id', checkContactId, getContactById);
router.patch('/:id', checkContactId, checkContactData, updateContact);
router.delete('/:id', checkContactId, removeContact);

module.exports = router;
