import express from 'express';
import contactsController from '../../controllers/contacts-controller.js';
import { isEmptyBody } from '../../middlewares/index.js';
import { validateBody } from '../../decorators/index.js';
import { contactAddSchema, contactUpdateSchema } from '../../schemas/contact-schemas.js';

const router = express.Router();

router.get('/', contactsController.getAll);
router.get('/:contactId', contactsController.getById);
router.post('/', isEmptyBody, validateBody(contactAddSchema), contactsController.addContact);
router.delete('/:contactId', contactsController.removeById);
router.put('/:contactId', isEmptyBody, validateBody(contactUpdateSchema), contactsController.updateById);

export default router;
