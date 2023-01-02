const express = require('express');
const { tryCatchWrapper } = require('../../helpers');
const {
  getContacts,
  getContact,
  deleteContact,
  addNewContact,
  updateContactById,
} = require('../../controllers/contactsControllers');
const { validateBody } = require('../../middlewares');
const { contactSchema } = require('../../schemas');
const router = express.Router();

router.get('/', tryCatchWrapper(getContacts));

router.get('/:contactId', tryCatchWrapper(getContact));

router.post('/', validateBody(contactSchema), tryCatchWrapper(addNewContact));

router.delete('/:contactId', tryCatchWrapper(deleteContact));

router.put(
  '/:contactId',
  validateBody(contactSchema),
  tryCatchWrapper(updateContactById)
);

module.exports = router;
