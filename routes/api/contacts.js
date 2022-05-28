const express = require('express');

const contacts = require('../../controls/index');

const { addValidation, ctrlWrapper } = require('../../middlewares/index');

const router = express.Router();

router.get('/', ctrlWrapper(contacts.getAll));

router.get('/:contactId', ctrlWrapper(contacts.getById));

router.post('/', addValidation, ctrlWrapper(contacts.add));

router.delete('/:contactId', ctrlWrapper(contacts.deleteById));

router.put('/:contactId', addValidation, ctrlWrapper(contacts.updateById));

module.exports = router;
