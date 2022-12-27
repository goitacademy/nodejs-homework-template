const express = require('express');
const controller = require("../../controllers/contacts");

const router = express.Router();

router.get('/', controller.getContacts);

router.get('/:contactId', controller.getContactById);

router.post('/', controller.postContact);

router.delete('/:contactId', controller.deleteContact);

router.put('/:contactId', controller.putContact);

router.patch('/:contactId/favorite', controller.updateStatusContact);

module.exports = router;
