const express = require('express');

const ctrl = require('../../controllers/contacts');
const { validateBody } = require('../../decorators');
const schemas = require('../../schemas/contacts');

const addContactValidate = validateBody(schemas.contactAddSchema);

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:id', ctrl.getById);

router.post('/', addContactValidate, ctrl.add);

router.put('/:id', addContactValidate, ctrl.updateById);

router.delete('/:id', ctrl.deleteById);

module.exports = router;
