const express = require('express');
const contactsController = require('../../controllers/contacts-controller');
const schema = require('../../schemas/contact');
const { validateBody } = require('../../decorators');

const router = express.Router();

router.get('/', contactsController.allContacts);

router.get('/:contactId', contactsController.contactById);

router.post('/', validateBody(schema.contactAddSchema), contactsController.addNewContact);

router.delete('/:contactId', contactsController.deleteContactById);

router.put('/:contactId', validateBody(schema.contactAddSchema), contactsController.changeContact);

module.exports = router;
