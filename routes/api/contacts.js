const express = require('express')

const router = express.Router()

const {contacts: ctrl } = require('../../controllers')

const {validation} = require('../../middlewares');
const {contactSchema} = require('../../schema');

const validateMiddleware = validation(contactSchema);

router.get('/', ctrl.listContacts);

router.get('/:id', ctrl.getById);

router.post('/',validateMiddleware, ctrl.addContact);

router.put('/:id', validateMiddleware, ctrl.updateContact);

router.delete('/:contactId', ctrl.removeContact);


module.exports = router
