const express = require('express')


const {listContacts, getContactById, removeContact, addContact, updateContact} = require('../../models/contacts');



const router = express.Router();

router.route('/')
  .post(addContact)
  .get(listContacts);



router
  .route('/:contactId')
  .get(getContactById)
  .patch(updateContact)
  .delete(removeContact);

module.exports = router;