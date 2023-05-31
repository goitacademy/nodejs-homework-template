const express = require('express');

const router = express.Router();
const contactsController = require("../../controllers/contacts-controller");
const schemas = require("../../schemas/contacts-schemas");
const {validateBody} = require("../../decorators");




router.get('/', contactsController.getContacts);

router.get('/:contactId', contactsController.getContactById)

router.post('/', validateBody(schemas.contactsAddSchema), contactsController.addContact);

router.put('/:contactId', validateBody(schemas.contactsAddSchema), contactsController.updateContact);


router.delete('/:contactId', contactsController.removeContact);


module.exports = router;
