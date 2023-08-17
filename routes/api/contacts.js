import express from 'express';

import contactsController from '../../controllers/contactControllers.js'

import contactsSchema from '../../schema/schemaJoi.js'

import { validateBody } from '../../decorators/index.js';

import {isEmptyBody} from '../../middlewars/index.js';

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getAll);

contactsRouter.get('/:contactId', contactsController.getById);

contactsRouter.post('/',validateBody(contactsSchema.contactsAddSchema), contactsController.add);

contactsRouter.delete('/:contactId', contactsController.deleteById);

contactsRouter.put('/:contactId', isEmptyBody, validateBody(contactsSchema.contactsAddSchema), contactsController.updateById);

export default contactsRouter;
