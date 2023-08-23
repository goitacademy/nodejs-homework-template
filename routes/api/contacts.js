const express = require('express');
const ctrl = require('../../controllers/contacts');
const { validateBody } = require('../../middlewares');
const schemas = require('../../schemas/contacts');

const router = express.Router();

router.get('/', ctrl.getAllContacts);

router.get('/:contactId', ctrl.getByIdContact);

router.post('/', validateBody(schemas.contactSchema), ctrl.postContact);

router.delete('/:contactId', ctrl.deleteContact);

router.put('/:contactId', validateBody(schemas.contactSchema), ctrl.putContact);

module.exports = router;
