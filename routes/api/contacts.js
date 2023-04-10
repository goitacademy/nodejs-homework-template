const express = require("express");
const router = express.Router();

const validation = require("../../utils/validation");
const controllers = require("../../controllers/controllers");
const { isValidId } = require("../../middlewares");

router.get('/', controllers.getContacts)
router.get('/:contactId', isValidId, controllers.getContactId)
router.post('/', validation.validateAddContact, controllers.addContact)
router.delete('/:contactId', isValidId, controllers.deleteContactId)
router.put('/:contactId', isValidId, validation.validatePutContact, controllers.putContactId)
router.patch('/:contactId/favorite', isValidId, validation.validatePatchContact, controllers.updateFavoriteById)
module.exports = router;
    
    