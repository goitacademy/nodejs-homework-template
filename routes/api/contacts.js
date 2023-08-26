const express = require('express');
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const {validateBody} = require("../../middlewapres");
const schemas = require("../../schemas/contacts");

router.get('/', ctrl.listContacts);

// router.get('/:contactId', ctrl.getContactById);

// router.post('/', validateBody(schemas.addShema), ctrl.addContact);

// router.delete('/:contactId', ctrl.removeContact); 

// router.put('/:contactId', validateBody(schemas.addShema), ctrl.updateContact);

module.exports = router;
