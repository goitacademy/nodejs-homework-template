import express from 'express';
import { contactsController as controller } from '../../controllers/index.js';

import { validateBody } from '../../decorators/index.js';
import { contactsSchemas as schemas } from '../../schemas/index.js';
import {
  authenticate,
  isBodyEmpty,
  isValidId,
} from '../../middleware/index.js';

// ####################################################

const contactsRouter = express.Router();

contactsRouter.use(authenticate); // for all

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
