const express = require('express');

const { contacts: ctrl } = require('../../controllers');
const { auth } = require('../../middlewares');

const router = express.Router();

router.get('/', auth, ctrl.getAllContacts);
router.post('/', auth, ctrl.postContact);

// router.use("/:contactId", checkContactId);

router.get('/:contactId', auth, ctrl.getContactById);
router.put('/:contactId', auth, ctrl.putContactUpdate);
router.delete('/:contactId', auth, ctrl.deleteContactById);

router.patch('/:contactId/favorite', auth, ctrl.patchFavouriteContact);

module.exports = router;
