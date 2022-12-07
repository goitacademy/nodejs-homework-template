const express = require('express')
const joi = require("joi")

const contacts = require("../../models/index.js")

const router = express.Router()

const { HttpError } = require("../../helpers/HttpErrors")

router.get('/', async (req, res, next) => {
  try {
    const allContacts = await contacts.getAll()
    console.log(allContacts)
    res.json(allContacts)
  } catch (err) {
    next(err)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contacts.getById(contactId)

    if (!result) {
      throw HttpError(404, "Not found")
      // const err = new Error("Not found")
      // err.status = 404
      // throw err
    }
    console.log(result)
    res.json(result)
  } catch (err) {
    next(err)
  }
  res.json({ message: 'contactID-get template message' })
})


const addScheme = joi.object({
  name: joi.string().required(),
  phone: joi.number().required()
})

router.post('/', async (req, res, next) => {
  try {
    const {err} = addScheme.validate(req.body)
    if (err) { HttpError(400, err.message)}
    const result = await contacts.add(res.body)
console.log(result)
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
