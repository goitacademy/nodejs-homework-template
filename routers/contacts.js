import express from 'express';
import ContactsController from '../controllers/contacts.js';
import { userMiddleware } from '../middlewares/user.js';

const router = express.Router();

router.use(userMiddleware);

router.get('/', ContactsController.getContacts);
router.get('/:contactId', ContactsController.getContactById);
router.post('/', ContactsController.addContact);
router.delete('/:contactId', ContactsController.deleteContactById);
router.put('/:contactId', ContactsController.updateContactById);
router.put('/:contactId/favorite', ContactsController.updateStatusContact);

export default router;
