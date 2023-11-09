import express from 'express';

import { getAllContacts, getContact, postContact, deleteContact, changeContact } from '../../controllers/ctrlContacts.js';

export const router = express.Router()

router.get('/', getAllContacts)

router.get('/:contactId', getContact)

router.post('/', postContact)

router.delete('/:contactId', deleteContact)

router.put('/:contactId', changeContact)