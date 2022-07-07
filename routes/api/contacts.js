const express = require('express')

const router = express.Router()

const ctrl = require('../../controllers/contacts')

router.get('/', ctrl.getAll)
router.get('/:contactId', ctrl.getById)
router.post('/', ctrl.post)
router.delete('/:contactId', ctrl.remove)
router.put('/:contactId', ctrl.put)
router.patch('/:contactId/favorite', ctrl.updateFavorite)

module.exports = router
