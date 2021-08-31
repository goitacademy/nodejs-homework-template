const express = require('express')

const ctrl = require("../../controllers/contacts");

const router = express.Router()

router.get('/', ctrl.getAllContacts);

router.get('/:contactId', ctrl.getById);

router.post('/', ctrl.add);

router.delete('/:contactId', ctrl.delContactById);

router.patch('/:contactId', ctrl.updateContactById);

module.exports = router

    // "name": "Lois Lane",
    // "email": "lois-super@gmail.com,
    // "phone": "(323) 231-5678"