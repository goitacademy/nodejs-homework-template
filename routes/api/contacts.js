const express = require('express')

const router = express.Router();

const ctrl = require('../../controllers/contacts');

const {validateBody} = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const {ctrlWrapper} = require("../../helpers");

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:id', ctrlWrapper(ctrl.getById));

router.post('/', validateBody(schemas.schemaAdd),ctrlWrapper(ctrl.addContact));

router.put('/:id',validateBody(schemas.schemaAdd),ctrlWrapper(ctrl.updateById));

router.delete('/:id', ctrlWrapper(ctrl.removeById));

module.exports = router;
