import express from 'express';

import contactsController from '../../controllers/contactControllers.js'

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getAll);

contactsRouter.get('/:contactId', contactsController.getById);

contactsRouter.post('/', contactsController.add);

contactsRouter.delete('/:contactId', contactsController.deleteById);

contactsRouter.put('/:contactId', contactsController.updateById);

export default contactsRouter;
