import express from 'express';
import contactsController from '../../controllers/contacts-controller.js';
import { isEmptyBody, IsValidId } from '../../middlewares/index.js';
import { validateBody } from '../../decorators/index.js';
import { contactAddSchema, contactUpdateSchema, contactFavoriteSchema } from '../../models/Contact.js';

const router = express.Router();

router.get('/', contactsController.getAll);
router.get('/:contactId', IsValidId, contactsController.getById);
router.post('/', isEmptyBody, validateBody(contactAddSchema), contactsController.addContact);
router.delete('/:contactId', IsValidId, contactsController.removeById);
router.put('/:contactId', IsValidId, isEmptyBody, validateBody(contactUpdateSchema), contactsController.updateById);
router.patch(
  '/:contactId/favorite',
  IsValidId,
  isEmptyBody,
  validateBody(contactFavoriteSchema),
  contactsController.updateStatusContact
);

export default router;
