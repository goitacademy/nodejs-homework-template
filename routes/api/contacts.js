const express = require('express');

const ctrl = require('../../controllers/contacts');

const { validateBody } = require('../../middlewares');

const addSchema = require('../../schemas/addContacts');

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', validateBody(addSchema), ctrl.add);

router.put('/:contactId', validateBody(addSchema), ctrl.updateById);

router.patch('/:contactId/favorite', ctrl.updateStatus);

router.delete('/:contactId', ctrl.deleteById);

module.exports = router;