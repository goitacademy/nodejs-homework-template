const express = require('express')

const ctrl = require('../../controllers/contacts')

const router = express.Router()

const { isValidId } = require('../../middlewares')


router.get('/', ctrl.getAll )
router.get('/:contactId',isValidId, ctrl.getById)
router.post('/', ctrl.add)
router.put('/:contactId',isValidId, ctrl.putById)
router.delete('/:contactId', isValidId, ctrl.delById)
router.patch('/:contactId/favorite', isValidId, ctrl.updateFavorite)



module.exports = router
