const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers');
const { validateBody } = require('../../middlewares');
const { addSchema } = require('../../schemas/books');

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', validateBody(addSchema), ctrl.add);

router.delete('/:contactId', ctrl.deleteById);

router.put('/:contactId', validateBody(addSchema), ctrl.updateById);

module.exports = router;
