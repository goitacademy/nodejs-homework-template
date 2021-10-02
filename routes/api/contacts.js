const express = require('express')
const router = express.Router()
const { controllerWrapper } = require('../../middelwares')
const { contacts: ctrl } = require('../../controllers')

router.get('/', controllerWrapper(ctrl.getAll))

router.get('/:contactId', controllerWrapper(ctrl.getById))

router.post('/', controllerWrapper(ctrl.add))

router.delete('/:contactId', controllerWrapper(ctrl.remove))

router.put('/:contactId', controllerWrapper(ctrl.updateById))

module.exports = router
