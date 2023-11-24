const express = require('express');
const contactController = require('../../controllers/contacts');


const router = express.Router();


router.get('/', contactController.listContacts)

router.get('/:contactId', contactController.getContactById)

router.post('/', contactController.addContact)

router.delete('/:contactId', contactController.removeContact) 

router.put('/:contactId', contactController.updateContact)

module.exports = router;
