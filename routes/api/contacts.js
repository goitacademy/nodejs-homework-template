const express = require('express');
const ctrl = require('../../controllers/contactsCtrl');
const validateId = require('../../middlewares/idValidId')

const router = express.Router();


router.get('/', ctrl.listContacts);

router.get('/:contactId',validateId, ctrl.getContactById);

router.post('/', ctrl.addContact);

router.delete('/:contactId', validateId, ctrl.removeContact);

router.put('/:contactId', validateId, ctrl.updateContact);

router.patch('/:contactId/favorite', validateId, ctrl.updateFavoriteContact);


module.exports = router
