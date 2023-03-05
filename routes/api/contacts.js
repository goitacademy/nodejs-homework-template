const express = require('express');
const {getAllContacts, getContact, createContact, deliteContact, changeContact} = require('../../controllers/contacts')
const router = express.Router()


router.get('/', getAllContacts);

router.get('/:contactId', getContact);

router.post('/', createContact);

router.delete('/:contactId', deliteContact) 

router.put('/:contactId', changeContact) 

module.exports = router



