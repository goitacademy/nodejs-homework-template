import { Router } from 'express';
import controllersContact from '../../controlers/controllersContacts.js';
import { ctrlWrapper, validateBody } from '../../helpers/index.js';
import { contactAddShcema, updateFavoriteShema } from '../../models/Contact.js';
import {
  isBodyEmpty,
  isValidId,
  validateFavotite,
} from '../../middlewares/index.js';
const { add, getAll, getById, put, deleteById } = controllersContact;
const router = Router();
const joiValidate = validateBody(contactAddShcema);
const joiUpdate = validateFavotite(updateFavoriteShema);
router.get('/', ctrlWrapper(getAll));

router.get('/:contactId', isValidId, ctrlWrapper(getById));

router.delete('/:contactId', isValidId, ctrlWrapper(deleteById));

router.post('/', isBodyEmpty, joiValidate, ctrlWrapper(add));

router.put('/:contactId', joiValidate, isValidId, ctrlWrapper(put));

router.patch('/:contactId/favorite', joiUpdate, isValidId, ctrlWrapper(put));
export default router;
