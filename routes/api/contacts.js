import express from 'express';
import { Router } from 'express';

// import {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,} from '../../models/contacts.js';
import {
  getAllContacts,
  getIdOfContact,
  postNewContact,
  deleteContactById,
  changeContact
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
router.put('/:contactId',changeContact);


export default router;
