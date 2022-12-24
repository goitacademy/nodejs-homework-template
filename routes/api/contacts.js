import express, { Router } from 'express';

import {
  getAllContacts,
  getIdOfContact,
  postNewContact,
  deleteContactById,
  changeContact,
  changeContactByPatch
} from '../../controllers/contactsControllers.js'

const router = Router();

//GET "api/posts"
router.get('/', getAllContacts);

//GET "api/posts/1"
router.get('/:contactId', getIdOfContact);

//POST "/api/contacts => [newPost, ...posts]"
router.post('/', postNewContact);

// DELETE by contactId
router.delete('/:contactId', deleteContactById);

/// PUT by contactId
router.put('/:contactId', changeContact);

//Patch
router.patch('/:contactId/favourite', changeContactByPatch)


export default router;
