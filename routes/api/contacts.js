const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contacts')
const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatus,
  validateMongoId,
} = require('./validation')

router.use((req, res, next) => {
  console.log(req.url)
  next()
})

router.get('/', ctrl.getAll).post('/', validationCreateContact, ctrl.create)

router
  .get('/:contactId', validateMongoId, ctrl.getById)
  .delete('/:contactId', validateMongoId, ctrl.remove)
  .put('/:contactId', validateMongoId, validationUpdateContact, ctrl.update)

router.patch('/:contactId/favorite', validationUpdateStatus, ctrl.update)

module.exports = router
