const express = require('express')

const {contacts:ctrl} = require('../../controllers')

const { ctrlWrapper } = require('../../helpers')

const { validation } = require('../../middlewares')

const { schemaAdd, schemaUpdate } = require('../../schemas/contacts');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.listContacts))

router.get('/:id', ctrlWrapper(ctrl.getContactById))

router.post('/', validation(schemaAdd), ctrlWrapper(ctrl.addContact));

router.delete('/:id',ctrlWrapper(ctrl.removeContact))

router.put('/:id',validation(schemaUpdate), ctrlWrapper(ctrl.updateContact))

module.exports = router;
