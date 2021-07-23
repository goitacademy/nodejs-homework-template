const express = require('express');
const router = express.Router();
const ctrlContacts = require('../controller');

router.get('/contacts', ctrlContacts.getContacts);

router.get('/contacts/:id', ctrlContacts.getById);

router.post('/contacts', ctrlContacts.create);

router.delete('/contacts/:id', ctrlContacts.deleteContact);

router.put('/contacts/:id', ctrlContacts.update);

router.patch('/contacts/:id/status', ctrlContacts.updateStatus);

module.exports = router;
