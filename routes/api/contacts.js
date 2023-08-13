const express = require('express');

const router = express.Router();

const ctrl = require("../../controllers/contacts");
const { validationBody } = require("../../middlewars");
const { validationSchema } = require("../../schemas/contacts");

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', validationBody(validationSchema,"Missing required name field"), ctrl.addContact)

router.delete('/:contactId', ctrl.deleteContact)

router.put('/:contactId', validationBody(validationSchema,"Missing fields"), ctrl.updateContact)

module.exports = router
