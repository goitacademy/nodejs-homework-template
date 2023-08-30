const express = require('express');

const ctrl = require('../../controllers/contacts');

const { validateBody, isValidId } = require('../../middlewares');

const {addSchema, updateStatus} = require('../../schemas');

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:id', isValidId, ctrl.getById);

router.post('/', validateBody(addSchema), ctrl.add);

router.put('/:id', isValidId, validateBody(addSchema), ctrl.updateById);

router.patch('/:id/favorite', isValidId, validateBody(updateStatus), ctrl.updateStatus);

router.delete('/:id', isValidId, ctrl.deleteById);

module.exports = router;