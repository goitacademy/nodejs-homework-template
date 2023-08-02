const express = require('express')


const ctrl = require('../../controllers/contacts')

const isValidId = require('../../middleware')

const router = express.Router()


router.get('/', ctrl.getAll)

router.get('/:contactId', isValidId, ctrl.getById)

router.post('/', ctrl.add)

// router.put('/:contactId', ctrl.update)

// router.delete('/:contactId',ctrl.remove)

module.exports = router
