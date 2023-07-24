import express from 'express';
import controller from '../../controllers/contactsController.js';

import { validateBody } from '../../decorators/index.js';
import schemas from '../../schemas/contactsSchemas.js';
import { isBodyEmpty, isValidId } from '../../middleware/index.js';

// ####################################################

const contactsRouter = express.Router();

contactsRouter.get('/', controller.getAll);

contactsRouter.get('/:id', isValidId, controller.getById);

contactsRouter.post(
  '/',
  isBodyEmpty,
  validateBody(schemas.contactsAddSchema),
  controller.add
);

contactsRouter.delete('/:id', controller.deleteById);

contactsRouter.put(
  '/:id',
  isValidId,
  isBodyEmpty,
  validateBody(schemas.contactsAddSchema),
  controller.updateById
);

contactsRouter.patch(
  '/:id/favorite',
  isValidId,
  isBodyEmpty,
  validateBody(schemas.contactsToggleFavoriteSchema),
  controller.updateStatusContact
);

export default contactsRouter;
