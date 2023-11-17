import express from 'express';
import contactControllers from '../../controllers/contact-controllers.js';
import { isEmptyBody } from '../../middlewares/index.js';
const router = express.Router();

router.get('/', contactControllers.getAllContacts);

router.get('/:contactId', contactControllers.getContactsById);

router.post('/', isEmptyBody, contactControllers.addContact);

router.delete('/:contactId', contactControllers.deleteContact);

router.put('/:contactId', isEmptyBody, contactControllers.updateContacts);

export default router;
