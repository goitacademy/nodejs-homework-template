const express = require('express');
const ctrl = require('../../controllers/contacts.js');
const { validateBody } = require('../../middlewares');
const schemas = require('../../schemas/contacts.js');
const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', validateBody(schemas.dataSchema), ctrl.add);

router.delete('/:contactId', ctrl.deleteById);

router.put('/:contactId', validateBody(schemas.dataSchema), ctrl.updateById);

module.exports = router;


