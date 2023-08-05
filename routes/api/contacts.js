const express = require('express');

const ctrl = require('../../controllers/contacts');
const { validateBody, checkBody } = require('../../middlewares');
const schemas = require('../../schemas/contacts');

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:id', ctrl.getById);

router.post('/', checkBody, validateBody(schemas.addSchema), ctrl.add);

router.put('/:id', checkBody, validateBody(schemas.addSchema), ctrl.updateById);

router.delete('/:id', ctrl.deleteById);

module.exports = router;
