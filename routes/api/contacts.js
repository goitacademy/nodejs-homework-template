const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts')

const { validateBody } = require('../../middellwares');
const schemas = require("../../schemas/contacts")

router.get('/', ctrl.getListContacts)

router.get('/:contactId', ctrl.contactById)

router.post('/', validateBody(schemas.addShcema), ctrl.addContact)

router.delete('/:contactId', ctrl.removeContact)

router.put('/:contactId', validateBody(schemas.addShcema), ctrl.updateContact)

module.exports = router
