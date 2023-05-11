const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts');
const {validateBody} = require('../../middlewares')
const schemas = require('../../schemas/contacts');

router.get('/', ctrl.getAll);

router.get('/:id', ctrl.getById);

router.post('/', validateBody(schemas.addSchema), ctrl.addContact);

router.put('/:contactId',validateBody(schemas.addSchema), ctrl.updateById);

router.delete('/:contactId', ctrl.deleteById);

module.exports = router;
