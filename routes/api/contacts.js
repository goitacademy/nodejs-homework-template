const express = require('express');
const router = express.Router();
const contactsController = require('../../controller');

router.get('/', (req, res) => contactsController.listContactsController(req, res))

router.get('/:contactId', contactsController.getContactByIdController) 

router.post('/', contactsController.addContactController) 

router.delete('/:contactId', contactsController.removeContactController) 

router.put('/:contactId', contactsController.updateContactController) 

module.exports = router
