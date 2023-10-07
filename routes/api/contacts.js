import { Router } from 'express';
import controllersContact from '../../controlers/controllersContacts.js';
import { ctrlWrapper } from '../../helpers/index.js';

const { getAll, getById, deleteById, add, put } = controllersContact;
const router = Router();

router.get('/', ctrlWrapper(getAll));

router.get('/:contactId', ctrlWrapper(getById));

router.delete('/:contactId', ctrlWrapper(deleteById));

router.post('/', ctrlWrapper(add));

router.put('/:contactId', ctrlWrapper(put));

export default router;
