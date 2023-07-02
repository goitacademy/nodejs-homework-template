const express = require('express');

const contactsController = require('../../controllers/contacts-controllers');

const schemas = require('../../schemas/contacts-schema');

const {validateBody} = require('../../decorators');

const router = express.Router();

// GET /api/contacts 
router.get('/', contactsController.getAllContacts);

// GET /api/contacts/:id
router.get('/:id', contactsController.getContactById);

// POST /api/contacts
router.post('/', validateBody(schemas.contactSchema), contactsController.addContact);

// DELETE /api/contacts/:id
router.delete('/:id', contactsController.deleteContactById);

// PUT /api/contacts/:id
router.put('/:id', validateBody(schemas.contactSchema), contactsController.updateContactById);

module.exports = router;