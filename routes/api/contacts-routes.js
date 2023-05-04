const express = require('express');
const contactsControllers = require('../../controllers/contacts-controllers');
const { schemas } = require('../../models/contact');
const { validateBody } = require('../../utils');

const router = express.Router();

router.get('/', contactsControllers.getAllContacts);

router.get('/:id', contactsControllers.getContactById);

router.post('/', validateBody(schemas.contactAddSchema), contactsControllers.addContact);

// router.put('/:id', validateBody(schemas.contactAddSchema), contactsControllers.updateContactById);

// router.delete('/:id', contactsControllers.deleteContactById);

module.exports = router;
