const express = require('express');
const router = express.Router();
const contactsController = require('../../controller');

router.get('/', (req, res) => contactsController.listContactsController(req, res))

router.get('/:contactId', (req, res) => contactsController.getContactByIdController({ id: req.params.contactId }, res )) 

router.post('/', (req, res) => contactsController.addContactController(req.body, res)) 

router.delete('/:contactId', (req, res) => contactsController.removeContactController({ id: req.params.contactId }, res)) 

router.put('/:contactId', (req, res) => contactsController.updateContactController({ id: req.params.contactId, name: req.body.name,
  email: req.body.email, phone: req.body.phone}, res))

router.patch('/:contactId/favorite', (req,res) => contactsController.updateStatusContact(req, res))

module.exports = router
