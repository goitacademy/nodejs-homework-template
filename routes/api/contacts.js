const express = require('express');
const ctrl = require('../../controllers');
// const { postValidation } = require('../../validation');

const router = express.Router();

router.get('/', ctrl.getContactsList);

router.get('/:contactId', ctrl.getOneContact);

router.post('/', ctrl.postContact);

router.delete('/:contactId', ctrl.delateContact);

router.put('/:contactId', ctrl.putContact);

module.exports = router;
