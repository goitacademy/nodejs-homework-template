import express from 'express';
import contactsController from '../../controllers/contacts-controller.js';
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

// contactRouter.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

// contactRouter.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

export default contactRouter;
