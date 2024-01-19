const express = require('express');

const ctrl = require('../../controllers/contacts');

const { validateBody } = require('../../middlewares/');

const schemas = require('../../models/contact');

const router = express.Router();

// const contacts = require("../../models/contacts");

// const { HttpError } = require("../../helpers");

router.get('/', ctrl.listContacts);

router.get('/:contactId', ctrl.getContactById);

router.post('/', ctrl.addContact);

router.delete('/:contactId', ctrl.removeContact);

router.put('/:contactId', validateBody(schemas.addSchema), ctrl.updateContact);

module.exports = router
