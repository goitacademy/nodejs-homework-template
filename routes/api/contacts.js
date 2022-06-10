const express = require('express')

const {contacts} = require("../../controllers");
const { ctrlWrapper } = require('../../helpers')

const  validation  = require('../../middlewares')
const { schemaAdd, schemaUpdate } = require('../../schemas/contacts');

const router = express.Router();

router.get('/', ctrlWrapper(contacts.listContacts))

router.get('/:id', ctrlWrapper(contacts.getContactById))

router.post('/', validation(schemaAdd), ctrlWrapper(contacts.addContact));

router.delete('/:id',ctrlWrapper(contacts.removeContact))

router.put('/:id',validation(schemaUpdate), ctrlWrapper(contacts.updateContact))

module.exports = router;