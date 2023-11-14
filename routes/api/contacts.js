const express = require('express');

const ctrl = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

const { validateBody } = require("../../middlewars");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validateBody(schemas.contactsSchema), ctrlWrapper(ctrl.add));

router.delete('/:contactId', ctrlWrapper(ctrl.deleteContact));

router.put('/:contactId', validateBody(schemas.contactsSchema), ctrlWrapper(ctrl.updateById));

module.exports = router;
