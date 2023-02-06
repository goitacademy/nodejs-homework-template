const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts');
const { ControllersHelper } = require('../../helpers');

router.get('/', ControllersHelper(ctrl.getAll));

router.get('/:id', ControllersHelper(ctrl.getContactById));

router.post('/', ControllersHelper(ctrl.addContact));

router.delete('/:id', ControllersHelper(ctrl.removeContact));

router.put('/:id', ControllersHelper(ctrl.updateContact));

module.exports = router;
