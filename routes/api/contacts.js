const express = require('express');
const router = express.Router();
const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} = require('../../controllers/contactsControllers');

const { validateBody } = require("../../helpers");
const {
  createContactSchema,
  updateContactSchema,
} = require('../../schemas/contactsSchemas');

router.get('/', getAllContacts);

router.get('/:id', getOneContact);

router.post('/', validateBody(createContactSchema), createContact);

router.put('/:id', validateBody(updateContactSchema), updateContact);

router.delete('/:id', deleteContact);

module.exports = router;
