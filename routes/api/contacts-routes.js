const express = require('express');
const contactsControllers = require('../../controllers/contacts-controllers');
const schema = require('../../schemas/contacts-schema');
const { validateBody } = require('../../utils');

const router = express.Router();

router.get('/', contactsControllers.getAllContacts);

router.get('/:id', contactsControllers.getContactById);

router.post('/', validateBody(schema.contactAddSchema), contactsControllers.addContact);

router.put('/:id', validateBody(schema.contactAddSchema), contactsControllers.updateContactById);

router.delete('/:id', contactsControllers.deleteContactById);

module.exports = router;
