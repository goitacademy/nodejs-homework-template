const express = require('express');

const { contacts: ctrl } = require('../../controllers/index');

const router = express.Router();

router.get('/', ctrl.getAllContacts);
router.post('/', ctrl.postContact);

router.get('/:contactId', ctrl.getContactById);
router.put('/:contactId', ctrl.putContactUpdate);
router.delete('/:contactId', ctrl.deleteContactById);

module.exports = router;
