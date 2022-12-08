const express = require('express')

const ctrl = require("../../controllers/contacts/index.js")

const router = express.Router()

router.get('/', ctrl.getAll)
router.get('/:contactId', ctrl.getById)
router.post('/', ctrl.add)
router.put('/:contactId', ctrl.updateById)
router.delete('/:contactId', ctrl.deleteById)


module.exports = router
