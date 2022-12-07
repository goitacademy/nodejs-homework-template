const express = require('express')

const router = express.Router()

const { contacts: ctrl } = require("../../controllers");
const { validation } = require('../../validation/contacts');
const { joiSchema } = require('../../model/contact');


router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', validation(joiSchema),  ctrl.add);

router.delete('/:contactId', ctrl.deleteContact);

router.put('/:contactId', validation(joiSchema), ctrl.updateContact);

module.exports = router;
