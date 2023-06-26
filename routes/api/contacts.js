const express = require('express');
const ctrl = require('../../controllers/controllers');
const { validateBody } = require('../../middlewares');
const shemas = require('../../shemas/shemas');

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get('/:contactId', ctrl.getById);

router.post('/', validateBody(shemas.addSchema), ctrl.addContact);

router.delete('/:contactId', ctrl.removeContact);

router.put('/:contactId', validateBody(shemas.addSchema), ctrl.updateContact);

module.exports = router;
