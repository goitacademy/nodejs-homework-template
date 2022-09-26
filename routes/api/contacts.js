const express = require('express');
const router = express.Router();

const controller = require("../../controllers/contacts");
const { controllerWrapper } = require("../../helpers");

router.get('/', controllerWrapper(controller.getAllContacts));

router.get('/:contactId', controllerWrapper(controller.getContactById));

router.post('/', controllerWrapper(controller.addContact));

router.delete('/:contactId', controllerWrapper(controller.removeContact));

router.put('/:contactId', controllerWrapper(controller.updateContact));

module.exports = router;