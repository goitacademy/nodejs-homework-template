const controller = require("../../controllers/contacts")
const express = require('express');
const validateBody = require("../../middlewar/validate-body");
const { addSchema, updateSchema } = require("../../utils/validation");

const router = express.Router();

router.get('/', controller.getContactsList);

router.get('/:contactId', controller.getContact);

router.post('/', validateBody(addSchema), controller.addContact);

router.delete('/:contactId', controller.deleteContact);

router.put('/:contactId', validateBody(updateSchema), controller.updateContact);

module.exports = router;
