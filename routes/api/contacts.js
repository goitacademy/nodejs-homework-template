const express = require("express");
const router = express.Router();

const validation = require("../../utils/validation");

const controllers = require("../../controllers/controllers");

router.get('/', controllers.getContacts)
router.get('/:contactId', controllers.getContactId)
router.post('/', validation.validateAddContact, controllers.addContact)
router.delete('/:contactId', controllers.deleteContactId)
router.put('/:contactId', validation.validatePutContact, controllers.putContactId)
router.patch('/:contactId/favorite', validation.validatePatchContact, controllers.updateFavoriteById)
module.exports = router;
    
    