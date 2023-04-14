const express = require('express');
const ctrl = require("../../controllers/contacts-controllers.js");
const isValidId = require("../../middlewares/isValidId.js");
const authenticate = require("../../middlewares/authenticate.js");

const router = express.Router();

router.get('/', authenticate, ctrl.getAllContacts);
router.get('/:contactId', authenticate, isValidId, ctrl.getContactById);  
router.post('/', authenticate, ctrl.addContact);
router.delete('/:contactId', authenticate, isValidId, ctrl.deleteContact);
router.put('/:contactId', authenticate, isValidId, ctrl.updateContact);
router.patch('/:contactId/favorite', authenticate, isValidId, ctrl.updateStatusContact);


module.exports = router;
