import express from 'express';
import ctrl from '../../controllers/contacts.js';
import schemaValidation from '../../schemas/contacts.js';
import { validatedContacts } from '../../middlewares/index.js';

const router = express.Router();

router.get('/', ctrl.getAllContacts);

router.get('/:contactId', ctrl.getContactById);

router.post('/', validatedContacts(schemaValidation), ctrl.createContact);

router.delete('/:contactId', ctrl.removeContactById);

router.put('/:contactId', ctrl.updateContactById);

export default router;
