import { Router } from 'express';
import controllersContact from '../../controlers/controllersContacts.js';
import { ctrlWrapper, validateBody } from '../../helpers/index.js';
import { contactAddShcema } from '../../models/contact.js';
import { isBodyEmpty, isValidId } from '../../middlewares/index.js';
const { add, getAll, getById, put } = controllersContact;
const router = Router();
const joiValidate = validateBody(contactAddShcema);
router.get('/', ctrlWrapper(getAll));

router.get('/:contactId', isValidId, ctrlWrapper(getById));

// router.delete('/:contactId',isValidId, ctrlWrapper(deleteById));

router.post('/', isBodyEmpty, joiValidate, ctrlWrapper(add));

router.put('/:contactId', joiValidate, isValidId, ctrlWrapper(put));
// , deleteById
export default router;
