const express = require('express');
const ctrl = require('../../controllers/contactsCtrl');
const validateId = require('../../middlewares/idValidId')
const authenticate = require('../../middlewares/authenticate')

const router = express.Router();


router.get('/', authenticate, ctrl.listContacts);

router.get('/:contactId',authenticate, validateId, ctrl.getContactById);

router.post('/',authenticate, ctrl.addContact);

router.delete('/:contactId',authenticate, validateId, ctrl.removeContact);

router.put('/:contactId', authenticate, validateId, ctrl.updateContact);

router.patch('/:contactId/favorite', authenticate, validateId, ctrl.updateFavoriteContact);


module.exports = router
