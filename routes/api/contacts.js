const express = require('express');
const ctrl = require("../../controllers/contacts");
// const { listContacts, getContactById, addContact, removeContact, updateContact  } = require('../../models/contacts');
// const { HttpError } = require('../../helpers');
// const { contactValidator } = require('../../shemas/validatorContacts');

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', ctrl.add);

router.delete('/:contactId', ctrl.deleteById)

router.put('/:contactId', ctrl.updateById);

module.exports = router;
