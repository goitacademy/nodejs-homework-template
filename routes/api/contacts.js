const express = require('express');

const ctrl = require("../../controllers/contacts")

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get('/', ctrl.listContacts);

router.get('/:id', ctrl.getById);

router.post('/', validateBody(schemas.addSchema), ctrl.add);

router.put('/:id', validateBody(schemas.addSchema), ctrl.updateById);

router.delete('/:id', ctrl.removeById);

module.exports = router;
