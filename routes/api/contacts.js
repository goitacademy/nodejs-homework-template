import express from 'express';

import {getAll, getById, add, updateById, deleteById} from '../../controllers/contacts-controller.js'

import { isEmptyBody } from '../../middlewares/isEmptyBody.js';

import { ctrlWrapper } from '../../decorators/ctrlWrapper.js';
import {validateBody} from '../../decorators/validateBody.js'

import { contactAddSchema, contactUpdateSchema } from '../../schemas/contact-schemas.js';

const router = express.Router();

router.get('/', ctrlWrapper(getAll));

router.get('/:contactId', ctrlWrapper(getById));

router.post('/', isEmptyBody, validateBody(contactAddSchema), ctrlWrapper(add));

router.delete('/:contactId', ctrlWrapper(deleteById))

router.put('/:contactId', isEmptyBody, validateBody(contactUpdateSchema), ctrlWrapper(updateById));

export default router;
