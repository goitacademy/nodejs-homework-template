import { Router } from 'express'

import {validateBody} from '../../decorators/index.js';

import {authenticate,isEmptyBody, isValidId} from '../../middlewares/index.js';

import contactsSchema from '../../schemas/contacts-schemas.js';

import {contactsController} from '../../controllers/index.js';

const router = Router();

router.use(authenticate);

router.get('/', contactsController.getAll);

router.get('/:id', isValidId, contactsController.getById)

router.post('/',isEmptyBody,validateBody(contactsSchema.contactAddSchema), contactsController.add);

router.delete('/:id', isValidId, contactsController.deleteById);

router.put('/:id', isValidId, isEmptyBody, validateBody(contactsSchema.contactAddSchema),contactsController.updateById);

router.patch('/:id/favorite', isValidId, validateBody(contactsSchema.contactUpdateFavoriteSchema), contactsController.updateFavorite)

export default router;
