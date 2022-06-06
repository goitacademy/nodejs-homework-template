const express = require('express');

const ctrlContact = require('../../controller.js');

const router = express.Router();


router.get('/', ctrlContact.get);

router.get('/:contactId', ctrlContact.getById);

router.post('/', ctrlContact.post);

router.delete('/:contactId', ctrlContact.remove);

router.put('/:contactId', ctrlContact.put);

router.patch('/:contactId/favorite', ctrlContact.patch);

module.exports = router
