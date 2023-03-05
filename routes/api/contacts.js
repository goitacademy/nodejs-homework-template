const express = require('express');

const { validation } = require('../../middlewares');
const { contactSchema } = require('../../schemas');
const { ctrlWrap } = require('../../helpers');
const { contacts: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', ctrlWrap(ctrl.getContacts));

router.get('/:contactId', ctrlWrap(ctrl.getById));

router.post('/', validation({ schema: contactSchema, message: "missing required name field" }), ctrlWrap(ctrl.add));

router.delete('/:contactId', ctrlWrap(ctrl.removeById));

router.put('/:contactId', validation({ schema: contactSchema, message: "missing fields" }), ctrlWrap(ctrl.updateById));

module.exports = router;
