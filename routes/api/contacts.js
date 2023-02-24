const express = require('express');
const router = express.Router();
const contactsController = require('../../controller');
const { auth } = require("../../controller/auth");

router.use(auth)

router.get('/', (req, res) => contactsController.listContactsController(req, res))

router.get('/:contactId', (req, res) => contactsController.getContactByIdController(req, res )) 

router.post('/', (req, res) => contactsController.addContactController(req, res)) 

router.delete('/:contactId', (req, res) => contactsController.removeContactController(req, res)) 

router.put('/:contactId', (req, res) => contactsController.updateContactController(req, res))

router.patch('/:contactId/favorite', (req,res) => contactsController.updateStatusContact(req, res))

module.exports = router
