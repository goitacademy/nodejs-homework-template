const express = require('express')
const router = express.Router()

const contactOperations = require("../../model/index")
const {contactSchema} = require ("../../schemas")

router.get('/', async (req, res, next) => {
  try {
    const result = await contactOperations.listContacts()
    res.json({
      status: "success",
      code: 200,
      data: { result }
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await contactOperations.getContactById(id)
    if (!result) {
      const error = new Error(`Contact with id=${id} not found`)
      error.status = 404
      throw error
    }
    res.json({
      status: "success",
      code: 200,
      data: { result }
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body)
    const { error } = contactSchema.validate(req.body)
    if (error) {
      const err = new Error(error.message)
      err.status = 400
      throw err
    }
    const result = await contactOperations.addContact(req.body)
    res.status(201).json({
      status: "success",
      code: 201,
      data: { result }
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      const err = new Error(error.message)
      err.status = 400
      throw err
    }
    const {id} = req.params
    const result = await contactOperations.updateContact(id, req.body)
    if (!result) {
      const error = new Error(`Contact with id=${id} not found`)
      error.status = 404
      throw error
    }
    res.json({
      status: "success",
      code: 200,
      data: { result }
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
