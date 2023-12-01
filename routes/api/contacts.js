import express from 'express';

import {getAll, add, getById, deleteById, updateById, updateStatusContact} from '../../controllers/contacts-controller.js'

import { isEmptyBody } from '../../middlewares/isEmptyBody.js';
import {isValidId} from '../../middlewares/isValidId.js'

import { ctrlWrapper } from '../../decorators/ctrlWrapper.js';
import {validateBody} from '../../decorators/validateBody.js'

import { contactAddSchema, contactUpdateSchema, contactPatchFavorite } from '../../schemas/contact-schemas.js';

const router = express.Router();

router.get('/', ctrlWrapper(getAll));

router.get('/:contactId', isValidId, ctrlWrapper(getById));

router.post('/', isEmptyBody, validateBody(contactAddSchema), ctrlWrapper(add));

router.delete('/:contactId', isValidId, ctrlWrapper(deleteById))

router.put('/:contactId', isValidId, isEmptyBody, validateBody(contactUpdateSchema), ctrlWrapper(updateById));

router.patch('/:contactId/favorite', isValidId, isEmptyBody, validateBody(contactPatchFavorite), ctrlWrapper(updateStatusContact))

export default router;
