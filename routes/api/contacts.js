const express = require('express');
const {
  addContact,
  listContacts,
  getContactById,
  removeContact,
  updateContact,
} = require('../../controllers/contact');

const validateContact = require('../../middleware/validateContact');
const contactSchema = require('../../schemas/contact');
const updateContactSchema = require('../../schemas/updateContact');

const router = express.Router();

router.get('/', listContacts);

router.get('/:contactId', getContactById);

router.post('/', validateContact(contactSchema), addContact);

router.delete('/:contactId', removeContact);

router.put('/:contactId', validateContact(updateContactSchema), updateContact);

module.exports = router;
