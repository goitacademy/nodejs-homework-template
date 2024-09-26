const express = require('express');
const router = express.Router();
const contactsController = require('../../controllers/contactsController');
const {isEmptyBody} = require('../../middlewares/index');
const {validateBody} = require("../../decorators");
const {addSchema} = require("../../schemas");

const contactAddValidate = validateBody(addSchema);

router.get('/', contactsController.getAll )

router.get('/:contactId', contactsController.getById )

router.post('/', isEmptyBody, contactAddValidate, contactsController.addContact )

router.delete('/:contactId', contactsController.deleteContact )

router.put('/:contactId', isEmptyBody, contactAddValidate, contactsController.updateContact )

module.exports = router
