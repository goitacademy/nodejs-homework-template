const express = require('express')

const router = express.Router();

const ctrl = require('../../controllers/contacts');

const {validateBody} = require("../../middlewares");

const {schemas} = require("../../models/contacts");

const {ctrlWrapper} = require("../../helpers");

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:id', ctrlWrapper(ctrl.getById));

router.post('/', validateBody(schemas.addSchema),ctrlWrapper(ctrl.addContact));

router.put('/:id',validateBody(schemas.addSchema),ctrlWrapper(ctrl.updateById));

router.patch('/:id',validateBody(schemas.updateFavoriteSchema),ctrlWrapper(ctrl.updateFavorite));

router.delete('/:id', ctrlWrapper(ctrl.removeById));

module.exports = router;
