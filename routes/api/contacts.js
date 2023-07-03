const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/contacts');

const { validateBody } = require('../../middlewares');

const schemas = require('../../schemas/contacts');

router.get('/', ctrl.getAll);

// router.get('/:contactId', ctrl.getById);

// router.post('/', validateBody(schemas.contactSchema), ctrl.addNew);

// router.put('/:contactId', validateBody(schemas.contactSchema), ctrl.updateById);

// router.delete('/:contactId', ctrl.deleteById);

module.exports = router;
