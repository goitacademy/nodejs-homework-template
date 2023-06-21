const express = require('express')
const ctrl = require("../../controllers")
const validateBody = require('../../middlewares')
const addSchema = require('../../schemas')
const router = express.Router()

router.get('/', ctrl.getAll)

router.get('/:contactId', ctrl.getById)

router.post('/', validateBody(addSchema), ctrl.add)

router.delete('/:contactId', ctrl.remove)

router.put('/:contactId', validateBody(addSchema), ctrl.update)

module.exports = router