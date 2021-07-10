const express = require('express')
const router = express.Router()
const { contacts: ctrl } = require('../../controllers')
// const { getById } = require('../../controllers/contacts')

router.get('/', ctrl.getAll)

router.get('/:contactId', ctrl.getById)

router.post('/', ctrl.add)

router.delete('/:contactId', ctrl.del)

router.patch('/:contactId', ctrl.patch)

module.exports = router
