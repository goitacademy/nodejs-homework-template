const express = require('express')

const { contacts: ctrl } = require('../../controllers')
const router = express.Router()

router.get('/', ctrl.getAll)

router.get('/:contactId', ctrl.getById)

router.post('/', express.json(), ctrl.add)

router.delete('/:contactId', ctrl.del)

router.patch('/:contactId', express.json(), ctrl.update)

module.exports = router
