const express = require('express')

const router = express.Router()

const ctrl = require('../../controllers/contact');

const schemas = require('../../schemas/addSchema');

const {validateBody} = require('../../middlewares')

router.get('/', ctrl.listContacts);

router.get('/:contactId', ctrl.getContactById);

router.post("/", validateBody(schemas.addContact), ctrl.addContact)

router.delete('/:contactId', ctrl.removeContact);

router.put('/:contactId', validateBody(schemas.updateContact), ctrl.updateContact);

module.exports = router






