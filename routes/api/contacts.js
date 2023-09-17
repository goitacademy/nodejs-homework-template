import { Router } from 'express';
import ctrl from '../../controllers/contacts-controllers.js';
import contactsValidation from '../../validation/contacts-validation.js'

const router = Router();

router.get('/', ctrl.getAllContacts);

router.get('/:id', ctrl.getContactById);

router.post('/', contactsValidation.addContactValidate, ctrl.addContact); 

router.delete('/:id', ctrl.deleteContact);

router.put('/:id', contactsValidation.addContactValidate, ctrl.updateContact);

export default router;

