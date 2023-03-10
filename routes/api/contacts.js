const express = require('express')


const {listContacts, getContactById, removeContact, addContact, updateContact} = require('../../models/contacts');

const contactsMiddlewares = require('../../middlewares/contactsMiddlewares')

const router = express.Router();

router.route('/')
  .post(contactsMiddlewares.checkContactData,addContact)
  .get(listContacts);

router.use('/:contactId', contactsMiddlewares.checkContactId);

router
  .route('/:contactId')
  .get(getContactById)
  .patch(contactsMiddlewares.checkContactData,updateContact)
  .delete(removeContact);

