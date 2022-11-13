const express = require('express')

const ctrl = require('../../controllers/contacts')

const router = express.Router()

const { isValidId } = require('../../middlewares/Validation')
const {authenticate} = require('../../middlewares/Authentication')


router.get('/',authenticate, ctrl.getAll )
router.get('/:contactId',authenticate,isValidId, ctrl.getById)
router.post('/', authenticate , ctrl.add)
router.put('/:contactId',authenticate,isValidId, ctrl.putById)
router.delete('/:contactId',authenticate, isValidId, ctrl.delById)
router.patch('/:contactId/favorite',authenticate, isValidId, ctrl.updateFavorite)



module.exports = router
