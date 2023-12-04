import express from 'express';

import {getAll, add, getById, deleteById, updateById, updateStatusContact} from '../../controllers/contacts-controller.js'

import { isEmptyBody } from '../../middlewares/isEmptyBody.js';
import {isValidId} from '../../middlewares/isValidId.js'

import { ctrlWrapper } from '../../decorators/ctrlWrapper.js';
import {validateBody} from '../../decorators/validateBody.js'

import { contactAddSchema, contactUpdateSchema, contactPatchFavorite } from '../../schemas/contact-schemas.js';

const contactsRouter = express.Router();

contactsRouter.get('/', ctrlWrapper(getAll));

contactsRouter.get('/:contactId', isValidId, ctrlWrapper(getById));

contactsRouter.post('/', isEmptyBody, validateBody(contactAddSchema), ctrlWrapper(add));

contactsRouter.delete('/:contactId', isValidId, ctrlWrapper(deleteById))

contactsRouter.put('/:contactId', isValidId, isEmptyBody, validateBody(contactUpdateSchema), ctrlWrapper(updateById));

contactsRouter.patch('/:contactId/favorite', isValidId, isEmptyBody, validateBody(contactPatchFavorite), ctrlWrapper(updateStatusContact))

export default contactsRouter;
