const express = require('express')

const ctrl = require('../../controllers/contacts')

const router = express.Router()


// router.get('/', ctrl.getAll )
// router.get('/:contactId', ctrl.getById)
router.post('/', ctrl.add)
// router.put('/:contactId', ctrl.putById)
// router.delete('/:contactId', ctrl.delById)



module.exports = router
