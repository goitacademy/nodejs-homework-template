const express = require('express')

const router = express.Router()

const { contacts: ctrl } = require("../../controllers");
const { contactSchema, validation } = require('../../validation/contacts');

// const validateMiddleware = validation(contactSchema);

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', validation,  ctrl.add);

router.delete('/:contactId', ctrl.deleteContact);

router.put('/:contactId', validation, ctrl.updateContact);

module.exports = router;
