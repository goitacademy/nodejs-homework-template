const express = require('express')
const router = express.Router()

const {contactsCtrls} = require('../../controllers')

router.get('/', contactsCtrls.listContacts);

router.get('/:contactId', contactsCtrls.getContactById);

router.post('/', contactsCtrls.addContact);

router.delete('/:contactId', contactsCtrls.removeContact);

router.put('/:contactId', contactsCtrls.updateContact);

module.exports = router
