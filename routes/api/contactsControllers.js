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
  email: joi.string().required(),
  phone: joi.number().required(),
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = addScheme.validate(req.body)

    if (error) {
      throw HttpError(400, error.message)
    }

    const result = await contacts.add(req.body)
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }

})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = addScheme.validate(req.body)
    if (error) {
      throw HttpError(400, error.message)
    }

    const { contactId } = req.params

    const result = await contacts.updateById(contactId, req.body)
    if (!result) {
      throw HttpError(404, "Not found")
    }

    res.json(result)
  } catch (err) {
    next()
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contacts.removeById(contactId)

    if (!result) {
      throw HttpError(404, "Not found")
    }

    res.status(200).json({ message: "contact deleted" })
  } catch (err) {
    next(err)
  }
})


module.exports = router
