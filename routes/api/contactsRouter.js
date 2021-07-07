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
import authMiddleware from '../../middlewares/authMiddleware.js';
import { asyncWrapper } from '../../helpers/apiHelpers.js';
const contactsRouter = new express.Router();

contactsRouter.use(authMiddleware);

contactsRouter
    .get('/', asyncWrapper(getContactsController))
    .get('/:contactId', asyncWrapper(getContactByIdController))
    .post('/', addContactValidation, asyncWrapper(addContactController))
    .delete('/:contactId', asyncWrapper(deleteContactController))
    .put(
        '/:contactId',
        updateContactValidation,
        asyncWrapper(updateContactController),
    )
    .patch(
        '/:contactId/favorite',
        updateStatusContactValidation,
        asyncWrapper(updateStatusContactController),
    );
export default contactsRouter;
