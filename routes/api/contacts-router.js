import express from 'express';

import contactsController from '../../controllers/contacts-controllers.js';

const router = express.Router();

router.get('/', contactsController.getContactsList);

router.get('/:contactId', contactsController.getContactById);

router.post('/', contactsController.addNewContact);

router.delete('/:contactId', contactsController.deleteContactById);

router.put('/:contactId', contactsController.updateContactById);

export default router;
