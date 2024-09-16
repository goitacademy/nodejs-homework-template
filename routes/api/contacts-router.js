import express from 'express';
import contactsController from '../../controllers/contacts.js';
import { isEmptyBody } from '../../middlewares/index.js';
import { validateBodyWrapper } from '../../decorators/index.js';
import {
  contactAddSchema,
  contactUpdateSchema,
} from '../../schemas/validationSchema.js';
const contactRouter = express.Router();

contactRouter.get('/', contactsController.getAll);

contactRouter.get('/:id', contactsController.getById);

contactRouter.post(
  '/',
  isEmptyBody,
  validateBodyWrapper(contactAddSchema),
  contactsController.add
);

contactRouter.put(
  '/:id',
  isEmptyBody,
  validateBodyWrapper(contactUpdateSchema),
  contactsController.updateById
);

contactRouter.delete('/:id', contactsController.deleteById);

export default contactRouter;
