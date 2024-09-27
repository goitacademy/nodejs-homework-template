import express from 'express';
import {
  getAll,
  getById,
  addNewContact,
  updateById,
  deleteById,
} from '../../controllers/contact-controllers.js';

import isEmptyBody from '../../middlewares/isEmptyBody.js';

const router = express.Router()

router.get('/', getAll);

router.get('/:contactId',getById)

router.post('/', isEmptyBody, addNewContact);

router.delete('/:contactId', deleteById)

router.put('/:contactId', isEmptyBody, updateById);

export default router;
