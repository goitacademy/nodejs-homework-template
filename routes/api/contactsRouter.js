import express from 'express';
import controller from '../../controllers/contactsController.js';

import { validateBody } from '../../decorators/index.js';
import schemas from '../../schemas/contactsSchemas.js';
import { isBodyEmpty } from '../../middleware/index.js';

// ####################################################

const contactsRouter = express.Router();

contactsRouter.get('/', controller.getAll);
contactsRouter.get('/:id', controller.getById);
contactsRouter.post(
  '/',
  isBodyEmpty,
  validateBody(schemas.contactsAddSchema),
  controller.add
);
contactsRouter.put(
  '/:id',
  isBodyEmpty,
  validateBody(schemas.contactsAddSchema),
  controller.updateById
);
contactsRouter.delete('/:id', controller.deleteById);

export default contactsRouter;
