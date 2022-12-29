const express = require('express');
const router = express.Router();
const { contacts: ctrl } = require('../../Controllers');

const { validation, ctrlWrapper } = require('../../Middlewares');
const { schemContact } = require('../../Schema');

router.get('/', ctrlWrapper(ctrl.getAllContacts));

router.get('/:id', ctrlWrapper(ctrl.getContactById));

router.post('/', validation(schemContact), ctrlWrapper(ctrl.postNewContact));

router.put('/:id', validation(schemContact), ctrlWrapper(ctrl.putContactById));

router.delete('/:id', ctrlWrapper(ctrl.delContactById));

module.exports = router;
