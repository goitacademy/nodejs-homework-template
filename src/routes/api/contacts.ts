import express from 'express';
import {
  getContactByIdValidation,
  addContactValidation,
  updateContactValidation,
} from '../../middlewares/contacts.validation.middleware';
import {
  getContacts,
  getContactById,
  addContact,
  deleteContactById,
  updateContactById,
} from '../../controllers/contacts.controller';

const router = express.Router();

router.get('/', getContacts);
router.get('/:contactId', getContactByIdValidation, getContactById);
router.post('/', addContactValidation, addContact);
router.delete('/:contactId', getContactByIdValidation, deleteContactById);
router.put('/:contactId', [getContactByIdValidation, updateContactValidation], updateContactById);

export default router;
