const express = require('express');

const ctrl = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../helpers/ctrlWrapper');
const { validateBody } = require('../../middlewares');
const schema = require('../../schemas/contacts');
const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));
router.get('/:contactId', ctrlWrapper(ctrl.getContactById));
router.post('/', validateBody(schema.addSchema), ctrlWrapper(ctrl.addContact));
router.put('/:contactId', validateBody(schema.addSchema), ctrlWrapper(ctrl.updateContact));
router.delete('/:contactId', ctrlWrapper(ctrl.removeContact));

module.exports = router;
