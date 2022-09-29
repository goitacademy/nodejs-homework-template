const express = require('express');
const router = express.Router();

const controller = require("../../controllers/contacts");
const { controllerWrapper } = require("../../helpers");
const { isValidId } = require("../../middlewares");

router.get('/', controllerWrapper(controller.getAllContacts));

router.get('/:contactId', isValidId, controllerWrapper(controller.getContactById));

router.post('/', controllerWrapper(controller.addContact));

router.delete('/:contactId', isValidId, controllerWrapper(controller.removeContact));

router.put('/:contactId', isValidId, controllerWrapper(controller.updateContact));

router.patch('/:contactId/favorite', isValidId, controllerWrapper(controller.updateStatusContact));

module.exports = router;