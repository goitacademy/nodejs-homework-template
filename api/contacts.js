import { Router } from 'express';
import * as ContactsController from '../controllers/contacts.js';

const router = Router();

router.get('/', ContactsController.getContacts);
router.get('/:contactId', ContactsController.getContactById);
router.post('/', ContactsController.addContact);
router.delete('/:contactId', ContactsController.deleteContactById);
router.put('/:contactId', ContactsController.updateContactById);
router.put('/:contactId/favorite', ContactsController.updateStatusContact);

export default router;
