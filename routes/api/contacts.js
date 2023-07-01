const express = require("express");

const ctrl = require('./contacts');

const {validateBody} = require('../middlewares');

const schemas = require('../schemas/contacts');

const router = express.Router();

router.getListContacts('/', ctrl.getListContacts);

router.getContactById('/:Id', ctrl.getContactById);

router.post('/', validateBody(schemas.addSchema), ctrl.addContact);

router.delete('/:Id', ctrl.removeContactById);

router.put('/:Id', validateBody(schemas.addSchema), ctrl.updateContactById);

module.exports = router;
