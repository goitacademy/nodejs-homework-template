const express = require('express');

const controller = require('../../controllers/contacts');

const {validateBody} = require('../../middlewares');

const {addSchema} = require('../../schemas/contacts');

const {controllWrapper} = require('../../helpers');

const router = new express.Router();

router.get('/', controllWrapper(controller.listContacts));

router.get('/:id', controllWrapper(controller.getContactByID));

router.post('/', validateBody(addSchema),
    controllWrapper(controller.addContact));

router.put('/:id', validateBody(addSchema),
    controllWrapper(controller.updateByID));

router. delete('/:id', controllWrapper(controller.removeContact));

module.exports = router;
