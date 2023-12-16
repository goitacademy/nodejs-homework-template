import express from 'express';
import {
  getAll,
  getById,
  addNewContact,
  updateById,
  deleteById,
} from '../../controllers/contact-controllers.js';

const router = express.Router()

router.get('/', getAll);

router.get('/:contactId',getById)

router.post('/', addNewContact)

router.delete('/:contactId', deleteById)

router.put('/:contactId', updateById);

export default router;
