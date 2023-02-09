const express = require('express');
const router = express.Router();
const ctrlContacts = require('../../controller');

router.get('/', ctrlContacts.get);

router.get('/:id', ctrlContacts.getById);

router.post('/', ctrlContacts.create);

router.delete('/:id', ctrlContacts.removeById);

router.put('/:id', ctrlContacts.update);

router.patch('/:id/favorite', ctrlContacts.updateStatus);

module.exports = router;
