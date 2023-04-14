const express = require('express');

const router = express.Router();

const { validateBody } = require('../../middlewares');

const { addSchema, updateSchema } = require('../../schemas/contacts');

const ctrl = require('../../controllers/contacts');

router.get('/', ctrl.getContacts);

router.get('/:contactId', ctrl.getById);

router.post('/', validateBody(addSchema), ctrl.add);

router.delete('/:contactId', ctrl.deleteByID);

router.put('/:contactId', validateBody(updateSchema), ctrl.updateById);

module.exports = router

