const express = require('express');

const ctrl = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

const { validateBody, isValidId } = require("../../middlewars");

const {schemas} = require("../../models/contact");

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getById));

router.post('/',validateBody(schemas.contactsSchema),  ctrlWrapper(ctrl.add));

router.delete('/:contactId',isValidId, ctrlWrapper(ctrl.deleteContact));

router.put('/:contactId', isValidId, validateBody(schemas.contactsSchema), ctrlWrapper(ctrl.updateById));

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;
