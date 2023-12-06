import express from 'express';

import {getAll, add, getById, deleteById, updateById, updateStatusContact} from '../../controllers/contacts-controller.js'

import {isEmptyBody, isValidId, authenticate} from '../../middlewares/index.js'

import { ctrlWrapper, validateBody, validateQueryParam } from '../../decorators/index.js';

import { contactAddSchema, contactUpdateSchema, contactPatchFavorite } from '../../schemas/contact-schemas.js';

import { queryGetContactsSchema } from '../../schemas/query-schemas.js';

const contactsRouter = express.Router();

contactsRouter.use(ctrlWrapper(authenticate))

contactsRouter.get('/', validateQueryParam(queryGetContactsSchema), ctrlWrapper(getAll));

contactsRouter.get('/:contactId', isValidId, ctrlWrapper(getById));

contactsRouter.post('/', isEmptyBody, validateBody(contactAddSchema), ctrlWrapper(add));

contactsRouter.delete('/:contactId', isValidId, ctrlWrapper(deleteById))

contactsRouter.put('/:contactId', isValidId, isEmptyBody, validateBody(contactUpdateSchema), ctrlWrapper(updateById));

contactsRouter.patch('/:contactId/favorite', isValidId, isEmptyBody, validateBody(contactPatchFavorite), ctrlWrapper(updateStatusContact))

export default contactsRouter;
