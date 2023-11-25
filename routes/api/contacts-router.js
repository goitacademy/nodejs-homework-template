import express from 'express';
import {
  getAll,
  getById,
  removeById,
  updateById,
  addContact,
  updateStatusContact,
} from '../../controllers/contacts/index.js';
import { isEmptyBody, IsValidId } from '../../middlewares/index.js';
import { validateBody } from '../../decorators/index.js';
import { contactAddSchema, contactUpdateSchema, contactFavoriteSchema } from '../../models/Contact.js';

const contactRouter = express.Router();

contactRouter.route('/').get(getAll).post(isEmptyBody, validateBody(contactAddSchema), addContact);
contactRouter
  .route('/:contactId')
  .get(IsValidId, getById)
  .delete(IsValidId, removeById)
  .put(IsValidId, isEmptyBody, validateBody(contactUpdateSchema), updateById);

contactRouter.patch('/:contactId/favorite', IsValidId, isEmptyBody, validateBody(contactFavoriteSchema), updateStatusContact);

export default contactRouter;
