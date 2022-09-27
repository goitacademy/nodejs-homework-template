const express = require('express')

const router = express.Router()

const cntrl=require("../../controllers/contacts");

const {cntrlWrapper}= require("../../helpers")

router.get('/', cntrlWrapper(cntrl.getAll));

router.get('/:contactId', cntrlWrapper(cntrl.getById));

router.post('/', cntrlWrapper(cntrl.addContact));

router.delete('/:contactId', cntrlWrapper(cntrl.removeContact));

router.put('/:contactId', cntrlWrapper(cntrl.updateContact));

module.exports = router;
