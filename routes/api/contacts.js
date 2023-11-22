import express from 'express';

import contactsController from '../../controllers/contactsController.js';

// import { isEmptyBody } from '../../middlewares/isEmptyBody.js';

// import { isValidId } from '../../middlewares/isValidId.js';

import {
	contactAddSchema,
	contactUpdateById,
	contactNameSchema,
} from '../../schemas/contact-schemas.js';

const contactsRouter = express.Router();

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

contactsRouter.patch(
	'/:contactId/name',
	// validateBody(contactNameSchema),
	contactsController.updateById
);

// contactsRouter.delete('/:contactId', isValidId, contactsController.deleteById);

contactsRouter
	.route('/')
	.get(contactsController.getAllContacts)
	.post(contactsController.updateById);

contactsRouter
	.route('/:contactId')
	.get(contactsController.getById)
	.put(contactsController.updateById)
	.delete(contactsController.deleteById);

export default contactsRouter;
