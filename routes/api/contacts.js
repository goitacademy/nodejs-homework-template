import express from 'express';

import contactsController from '../../controllers/contactsController.js';

// import { isValidId } from '../../middlewares/isValidId.js';

import {
	contactAddSchema,
	contactUpdateById,
	contactNameSchema,
} from '../../schemas/contact-schemas.js';

const contactsRouter = express.Router();

contactsRouter
	.route('/')
	.get(contactsController.getAllContacts)
	.post(contactsController.add);

contactsRouter
	.route('/:contactId')
	.get(contactsController.getById)
	.put(contactsController.updateById)
	.delete(contactsController.deleteById);

contactsRouter.patch(
	'/:contactId/name',
	// validateBody(contactNameSchema),
	contactsController.updateById
);

export default contactsRouter;

// contactsRouter.get('/', contactsController.getAllContacts);

// contactsRouter.get('/:contactId', isValidId, contactsController.getById);

// contactsRouter.post(
// 	'/',
// 	// isEmptyBody,
// 	isValidId(contactAddSchema),
// 	contactsController.add
// );

// contactsRouter.put(
// 	'/:contactId',
// 	isValidId,
// 	// isEmptyBody,
// 	isValidId(contactUpdateById),
// 	contactsController.updateById
// );

// contactsRouter.delete('/:contactId', isValidId, contactsController.deleteById);
