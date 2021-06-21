import express from 'express';
import {
    getContactsController,
    getContactByIdController,
    deleteContactController,
    addContactController,
    updateContactController,
    updateStatusContactController,
} from '../../controllers/contactsControllers.js';
import {
    addContactValidation,
    updateContactValidation,
    updateStatusContactValidation,
} from '../../middlewares/validationMiddleware.js';

const contactsRouter = new express.Router();

contactsRouter
    .get('/', getContactsController)
    .get('/:contactId', getContactByIdController)
    .post('/', addContactValidation, addContactController)
    .delete('/:contactId', deleteContactController)
    .put('/:contactId', updateContactValidation, updateContactController)
    .patch(
        '/:contactId/favorite',
        updateStatusContactValidation,
        updateStatusContactController,
    );
export default contactsRouter;
