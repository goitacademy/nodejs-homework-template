const express = require('express')
const Joi = require('joi')

const router = express.Router()
const Controller = require('../../model/index')

const validationSchemaPOST = Joi.object({
  name: Joi.string().alphanum().min(3).max(15).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  phone: Joi.string()
    .max(12)
    .pattern(/\+?[0-9\s\-\\)]+/)
    .required(),
})

const validationSchemaPATCH = Joi.object({
  name: Joi.string().alphanum().min(3).max(15),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  phone: Joi.string()
    .max(12)
    .pattern(/\+?[0-9\s\-\\)]+/),
})

router.get('/', async (req, res, next) => {
  const list = await Controller.listContacts()
  res.status(200).json(list)
})

router.get('/:contactId', async (req, res, next) => {
  const contacsWithId = await Controller.getContactById(req.params.contactId)
  if (!contacsWithId) {
    res.status(404).json({ message: 'Not found' })
  } else res.status(200).json(contacsWithId)
})

router.post('/', async (req, res, next) => {
  const dataValidate = validationSchemaPOST.validate(req.body)
  if (dataValidate.error) {
    return res
      .status(404)
      .json({ message: 'missing required name field or validation error' })
  }

  const newContact = await Controller.addContact(req.body)
  res.status(201).json(newContact)
})

router.delete('/:contactId', async (req, res, next) => {
  const ifContactExist = await Controller.removeContact(req.params.contactId)
  if (!ifContactExist) {
    res.status(404).json({ message: 'Not found' })
  } else res.status(200).json({ message: 'contact deleted' })
})

router.patch('/:contactId', async (req, res, next) => {
  // console.log('telo zaprosa', req.body)
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'missing fields' })
  }

  const dataValidate = validationSchemaPATCH.validate(req.body)

  if (dataValidate.error) {
    return res.status(404).json({ message: `Validation error ${dataValidate.error.message}` })
  }

  const contacsWithId = await Controller.updateContact(
    req.params.contactId,
    req.body
  )

  if (!contacsWithId) {
    res.status(404).json({ message: 'Not found' })
  } else res.status(200).json(contacsWithId)
})

module.exports = router
