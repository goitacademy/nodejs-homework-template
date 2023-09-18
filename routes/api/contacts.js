const express = require('express')
const router = express.Router()

const ctrl = require("../../controllers/index")

const { validateBody } = require("../../middlewares/index")
const { contactsSchema } = require("../../schemas/index")

router.get('/', ctrl.getAllCtrl)

router.get('/:contactId', ctrl.getContactIdCtrl)

router.post('/', validateBody(contactsSchema), ctrl.postContactCtrl)

router.delete('/:contactId', ctrl.deleteContactCtrl)

router.put('/:contactId', validateBody(contactsSchema), ctrl.updateContactCtrl)

module.exports = router
