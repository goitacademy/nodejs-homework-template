import express from 'express';
import contactControllers from '../../controllers/contact-controllers.js';
const router = express.Router();

router.get('/', contactControllers.getAllContacts);

router.get('/:contactId', contactControllers.getContactsById);

router.post('/', contactControllers.addContact);

router.delete('/:contactId', contactControllers.deleteContact);

router.put('/:contactId', contactControllers.updateContacts);

export default router;
