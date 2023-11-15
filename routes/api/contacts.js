import express from 'express'
import contactsController from '../../controllers/contacts/contacts-controller.js';
import isEmptyBody from '../../middlewares/isEmptyBody.js';


 const router = express.Router()

router.get('/', contactsController.getAllContacts);

router.get('/:contactId', contactsController.getContactById);

router.post('/', isEmptyBody, contactsController.addContact);

router.put('/:contactId', isEmptyBody, contactsController.updateContactById);

router.delete('/:contactId' , contactsController.deleteContactById);




export default router;