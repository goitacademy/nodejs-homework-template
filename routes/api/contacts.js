const express = require('express');
const ctrl = require('../../controllers/contacts');
const ctrlWrapper = require('../../helpers/ctrWrapper');
const validateBody = require('../../middlewares/validateBody');
const schema = require('../../schemas/contactsSch')

const router = express.Router()

router.get('/', ctrlWrapper(ctrl.getList));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validateBody(schema.addSchema), ctrlWrapper(ctrl.add));

router.delete('/:contactId', ctrlWrapper(ctrl.remove));

router.put('/:contactId', validateBody(schema.addSchema), ctrlWrapper(ctrl.update));

module.exports = router
