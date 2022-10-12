const express = require('express');

const router = express.Router();


const controllers = require('../../controllers/controllers');

router.get('/', controllers.getListContacts);

router.get('/:contactId', controllers.getOneContact);

router.post('/', controllers.postContact);

router.delete('/:contactId', controllers.deleteContacts);

router.put('/:contactId', controllers.putContact);

module.exports = router;
