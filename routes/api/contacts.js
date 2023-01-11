const express = require('express');
const { tryCatchWrapper } = require('../../helpers/index');
const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateSomeContact,
} = require('../../controllers/contacts.controller');
const { addContactSchema } = require('../../schemas/contacts');
const { validateBody } = require('../../middlewares/index');
const router = express.Router()

router.get('/', tryCatchWrapper(getContacts));

router.get('/:contactId', tryCatchWrapper(getContact));

router.post('/', validateBody(addContactSchema), tryCatchWrapper(createContact));

router.delete('/:contactId', tryCatchWrapper(deleteContact));

router.put('/:contactId', validateBody(addContactSchema), tryCatchWrapper(updateSomeContact));

module.exports = router
