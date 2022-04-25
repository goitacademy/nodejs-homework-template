const express = require('express')

const { contacts: ctrl } = require('../../controllers')

const { auth, ctrlWrapper } = require('../../middlewares')

const router = express.Router()

router
  .get('/', auth, ctrlWrapper(ctrl.getContacts))
  .post('/', auth, ctrlWrapper(ctrl.postContact))

router
  .get('/:contactId', ctrlWrapper(ctrl.getContactById))
  .delete('/:contactId', ctrlWrapper(ctrl.deleteContact))
  .put('/:contactId', ctrlWrapper(ctrl.putContact))

router.patch('/:contactId/favorite', ctrlWrapper(ctrl.patchFavoriteContact))

module.exports = router
