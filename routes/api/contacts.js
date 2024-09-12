const express = require('express');
const { contactControllers } = require("../../controllers/index");

const router = express.Router()

router.get('/', contactControllers.getContacts)

router.get('/:contactId', contactControllers.getContactById)

router.post('/', contactControllers.creatContact)

router.delete('/:contactId', contactControllers.deleteContact)

router.put('/:contactId', contactControllers.updateContact)

module.exports = router
