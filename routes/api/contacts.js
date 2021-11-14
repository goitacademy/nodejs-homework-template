// const CreateError = require("http-errors");
const express = require('express')
const router = express.Router()
// const contactsOperation = require("../../model/index");
const Joi = require('joi')
const { validation400 } = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers')

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get('/', ctrl.getAll)

router.get('/:contactId', ctrl.getContactId)

router.post('/', validation400(schema), ctrl.postContact)

router.delete('/:contactId', ctrl.deleteContact)

router.put('/:contactId', validation400(schema), ctrl.putContact)

module.exports = router
