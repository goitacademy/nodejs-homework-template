
import express from 'express';
import contactController from '../../controllers/contactController.js';

const router = express.Router();
const contactsRouter = express.Router();
contactsRouter.get('/', contactController.getAllContacts)

contactsRouter.get('/:id', contactController.getContactById)

contactsRouter.post('/', contactController.addContact )

contactsRouter.delete('/:id', contactController.removeContact)

contactsRouter.put('/:id', contactController.updateContact)

export default contactsRouter;
