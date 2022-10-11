const express = require('express');

const { contacts: contactsCtrl } = require('../../controllers');

const router = express.Router();

router.get('/', contactsCtrl.getAll);

router.get('/:contactId', contactsCtrl.getById);

router.post('/', contactsCtrl.add);

router.delete('/:contactId', contactsCtrl.remove);

router.put('/:contactId', contactsCtrl.update);

module.exports = router;
