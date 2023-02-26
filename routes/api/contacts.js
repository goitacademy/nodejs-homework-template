const express = require('express');

// const contacts = require('../../models/contacts');
// const { HttpError } = require('../../helpers');
// const { newContSchema } = require('../../schemas/');

const ctrl = require('../../controllers/contacts');

const router = express.Router();

router.get('/', ctrl.getList);

router.get('/:contactId', ctrl.getById);

router.post('/', ctrl.add);

router.delete('/:contactId', ctrl.del);

router.put('/:contactId', ctrl.update);

module.exports = router;
