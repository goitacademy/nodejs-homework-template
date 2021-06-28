const express = require('express')
const router = express.Router()

const { contacts: ctrl } = require('../../controllers')

router.get('/', ctrl.getAll)

router.get('/:contactId', ctrl.getOne)

router.post('/', express.json(), ctrl.add)

router.delete('/:contactId', ctrl.remove)

router.put('/:contactId', express.json(), ctrl.update)

module.exports = router
