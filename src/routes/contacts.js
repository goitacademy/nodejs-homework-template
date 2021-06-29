const express = require('express')
const router = express.Router()
const { postContactValidation, patchContactValidation } = require('../middlewares/validationMiddleware')
const { authMiddleware } = require('../middlewares/authMiddleware')

const {
  getContactsController,
  getContactByIdController,
  postContactController,
  deleteContactController,
  patchContactController,
  updateStatusContactController
} = require('../controllers/contactsController')
const { asyncWrapper } = require('../helpers/apiHelpers')

router.use(authMiddleware)

router.get('/', asyncWrapper(getContactsController))
router.get('/:id', asyncWrapper(getContactByIdController))
router.post('/', postContactValidation, asyncWrapper(postContactController))
router.delete('/:id', asyncWrapper(deleteContactController))
router.patch('/:id', patchContactValidation, asyncWrapper(patchContactController))
router.patch('/:id/favorite', patchContactValidation, asyncWrapper(updateStatusContactController))

module.exports = router
