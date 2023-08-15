const express = require('express');
const router = express.Router();
const ctrl = require("../../controllers/contacts"); 
const { schema } = require("../../schemas/contacts");
const { validateBody } = require("../../middlewares")

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', validateBody(schema), ctrl.add);

router.delete('/:contactId', ctrl.removeById);

router.put('/:contactId', validateBody(schema), ctrl.updateById);

module.exports = router;