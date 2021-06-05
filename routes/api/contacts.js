const express = require('express')
const router = express.Router()
const Controllers = require('../../model/controllers/controllers')
const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact
} = require("../../model/validator");


router.patch('/:contactId/favorite',validationUpdateStatusContact, Controllers.update)

router.get('/', Controllers.getAll)
      .post('/', validationCreateContact, Controllers.create)

router.get('/:contactId', Controllers.getById)
      .delete('/:contactId', Controllers.remove)
      .put('/:contactId',validationUpdateContact, Controllers.updateId)

module.exports = router
