import express from 'express';

import { deleteContact, getAll, getById, postContact, putContact } from '../../controllers/contacts.js';

const router = express.Router();
router.get('/', getAll);
router.get('/:contactId', getById);
router.post('/', postContact);
router.delete('/:contactId', deleteContact);
router.put('/:contactId', putContact);

export default router;