const express = require('express');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../controllers/contactsControllers');

const router = express.Router();

const validateBody = require('../../middlewares/validateBody');
const { addSchema, updateSchema } = require('../../schemas/contactsSchema');

router.get('/', listContacts);

router.get('/:contactId', getContactById);

router.post('/', validateBody(addSchema), addContact);

router.delete('/:contactId', removeContact);

router.put('/:contactId', validateBody(updateSchema), updateContact);

module.exports = router;
