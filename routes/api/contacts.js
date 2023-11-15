import express from 'express'
import contactsController from '../../controllers/contacts/contacts-controller.js';
import isEmptyBody from '../../middlewares/isEmptyBody.js';
import { contactAddSchema, contactUpdateSchema } from '../../schemas/contact-schema.js';
import validateWrapper from '../../decorators/validateWrapper.js';


 const router = express.Router()

router.get('/', contactsController.getAllContacts);

router.get('/:contactId', contactsController.getContactById);

router.post('/', isEmptyBody, validateWrapper(contactAddSchema) , contactsController.addContact);

router.put('/:contactId', isEmptyBody,validateWrapper(contactUpdateSchema), contactsController.updateContactById);

router.delete('/:contactId' , contactsController.deleteContactById);




export default router;