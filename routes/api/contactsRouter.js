const express = require('express');
const {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact
} = require('../../controllers/contactsControllers');
const schema = require('../../schemas/contactsSchemas');
const validateBody = require('../../decorators/validateBody')
const router = express.Router();

router.get('/', getContacts);

router.get('/:id', getContactById);

router.post('/', validateBody(schema.contactAddSchema), addContact);

router.put('/:id', validateBody(schema.contactAddSchema), updateContact);

router.delete('/:id', removeContact);

module.exports = router;
