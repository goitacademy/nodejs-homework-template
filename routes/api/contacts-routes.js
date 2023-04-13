const express = require("express");
const router = express.Router();

const validation = require("../../utils/validation");
const controllers = require("../../controllers/contacts-controllers");
const { isValidId, authenticate } = require("../../middlewares");

router.get('/', authenticate, controllers.getContacts)
router.get('/:contactId', authenticate, isValidId, controllers.getContactId)
router.post('/', authenticate, validation.validateAddContact, controllers.addContact)
router.delete('/:contactId', authenticate, isValidId, controllers.deleteContactId)
router.put('/:contactId', authenticate, isValidId, validation.validatePutContact, controllers.putContactId)
router.patch('/:contactId/favorite', authenticate, isValidId, validation.validatePatchContact, controllers.updateFavoriteById)
module.exports = router;
    
    