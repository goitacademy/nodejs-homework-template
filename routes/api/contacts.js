const express = require('express');
const controllers = require('../../controllers/contacts/controllers');
const { contactValidation } = require('../../middlewares/validationContact');  

const router = express.Router();

router.get('/', controllers.getContacts);

router.get('/:contactId', controllers.getContactById);

router.post('/', contactValidation, controllers.addContacts);

router.delete('/:contactId', controllers.deleteContact);

router.put('/:contactId', contactValidation, controllers.patchContact);

router.patch('/:contactId/favorite', controllers.updateStatusContact);

module.exports = router
