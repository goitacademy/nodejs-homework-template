const express = require('express');
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const schemas = require("../../schemas/contacts"); 
const { ctrlWrapper } = require("../../helpers");
const { validateBody } = require("../../middelwares");


router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validateBody(schemas.contactsAddSchema), ctrlWrapper(ctrl.add));

router.delete('/:contactId', ctrlWrapper(ctrl.removeById));

router.put('/:contactId', validateBody(schemas.contactsUpdateScema), ctrlWrapper(ctrl.updateById));

module.exports = router;
