const express = require('express');
const ctrl = require('../../controllers/contacts');
const router = express.Router();
const { ValidateBody } = require('../../middleware')
const schemas = require('../../schemas/contacts')

router.get('/', ctrl.getAll);

router.get('/:id', ctrl.getById);

router.post('/', ValidateBody(schemas.addSchema), ctrl.add);

router.put('/:id', ValidateBody(schemas.addSchema), ctrl.update);

router.delete('/:id', ctrl.del);

module.exports = router