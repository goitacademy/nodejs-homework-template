const express = require('express');
const { contactScheme, updateContactScheme } = require('../../schemes');
const { controllerWrapper, validation } = require('../../middlewares/');
const { contacts: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', controllerWrapper(ctrl.listContacts));

router.get('/:contactId', controllerWrapper(ctrl.getContactById));

router.post('/', validation(contactScheme), controllerWrapper(ctrl.addContact));

router.delete('/:contactId', controllerWrapper(ctrl.removeContact));

router.put('/:contactId', validation(updateContactScheme), controllerWrapper(ctrl.updateContact));

module.exports = router;
