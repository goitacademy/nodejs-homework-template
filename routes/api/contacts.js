const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/contacts-controller');
const isEmptyBody = require('../../middlewares');
const validateBody = require('../../decorators');
const contactAddSchema = require('../../schemas/contact-schemas');

const contactAddValidate = validateBody(contactAddSchema);

router.get('/', controllers.getAllContacts);

router.get('/:id', controllers.getContactById);

router.post('/', isEmptyBody, contactAddValidate, controllers.addContact);

router.put('/:id', isEmptyBody, contactAddValidate, controllers.updateContact);

router.delete('/:id', controllers.removeContact);

module.exports = router;
