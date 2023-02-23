const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts')
const {ctrlWrapper} = require('../../helpers')
const middleware = require('../../middleware');
const addSchemas = require('../../schemas/addSchemas')

router.get('/', ctrlWrapper(ctrl.getAllContacts))

router.get('/:id', ctrlWrapper(ctrl.getContactById))

router.post('/', middleware(addSchemas), ctrlWrapper(ctrl.addNewContacts))

router.delete('/:id', ctrlWrapper(ctrl.deleteContact))

router.put('/:id', middleware(addSchemas), ctrlWrapper(ctrl.contactUpdate) )

module.exports = router
