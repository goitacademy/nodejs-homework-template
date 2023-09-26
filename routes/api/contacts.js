import { Router } from 'express';
import ctrl from '../../controllers/contacts-controllers.js';
import contactSchema from '../../schemas/schema-validation.js';
import { validateBody } from '../../middleware/index.js'

const router = Router();

const contactValidate = validateBody(contactSchema.addContactSchema);
const notEmpty = validateBody(contactSchema.notEmptySchema);

router.get('/', ctrl.getAllContacts);

router.get('/:id', ctrl.getContactById);

router.post('/', contactValidate, ctrl.addContact); 

router.delete('/:id', ctrl.deleteContact);

router.put('/:id', notEmpty, contactValidate, ctrl.updateContact);

export default router;

