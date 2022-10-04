const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../helpers')
const { validateBody } = require("../../middlewares")
const {schemas}= require("../../models/contacts")


router.get('/', ctrlWrapper(ctrl.getAll));

// router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validateBody(schemas.addSchema),   ctrlWrapper(ctrl.add));

// router.delete('/:contactId', ctrlWrapper(ctrl.delete))

// router.put('/:contactId', ctrlWrapper(ctrl.update));

module.exports = router





