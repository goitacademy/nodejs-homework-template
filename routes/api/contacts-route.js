import express from 'express';
import contactsControllers from '../../controllers/contacts-controller.js';
import {isEmptyBody} from "../../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.get('/', contactsControllers.getListContacts);

contactsRouter.get('/:id', contactsControllers.getById);

contactsRouter.post('/', isEmptyBody, contactsControllers.addContact);

contactsRouter.put('/:id', isEmptyBody, contactsControllers.updateContactsById);

contactsRouter.delete('/:id', contactsControllers.deleteContact);



export default  contactsRouter
