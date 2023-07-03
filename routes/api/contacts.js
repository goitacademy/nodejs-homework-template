const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/contacts');

const { validateBody } = require('../../middlewares');

const { schemas } = require('../../models/contact');

router.get('/', ctrl.getAll);

// router.get('/:contactId', ctrl.getById);

router.post('/', validateBody(schemas.addSchema), ctrl.addNew);

// router.put('/:contactId', validateBody(schemas.addSchema), ctrl.updateById);

// router.path('/:contactId/favorite', validateBody(schemas.addSchema), ctrl.updateById);

// router.delete('/:contactId', ctrl.deleteById);

module.exports = router;
