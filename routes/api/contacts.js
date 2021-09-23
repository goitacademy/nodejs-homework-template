const express = require('express')
const router = express.Router()

/* const { contactSchema } = require("../../schemas/") */
const {  ctrl } = require("../../controllers")
console.log(ctrl)
/* const contactsOperations = require("../../model/index") */
/* const { message } = require('../../schemas/contact') */


router.get('/', ctrl.getAll)

router.get('/:contactId', ctrl.getById)

router.post('/', ctrl.add)

router.delete('/:contactId', ctrl.remove)

router.put ('/:contactId', ctrl.updateById)

module.exports = router
