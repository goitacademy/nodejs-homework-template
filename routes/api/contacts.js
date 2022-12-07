const express = require('express');
// const { json } = require('express');
const ctrl = require("../../controllers/contacts");


const router = express.Router();

router.get('/', ctrl.listContacts);

router.get('/:id', ctrl.getContactById);

router.post('/', ctrl.addContact);

router.delete('/:id', ctrl.removeContact)

router.put('/:id', ctrl.updateContact)

module.exports = router
