const express = require('express')
const contacts = require('../../models/contacts')
const Joi = require('joi')


const router = express.Router()

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts()
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
  
})

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const result = await contacts.getContactById(id)
    if (!result) {
      const error = new Error("Not Found")
      error.status = 404
      throw error
    }
    res.json(result)
  } catch (error) {
      res.status(500).json({
        message: error.message
      })
  }
})

router.post('/', async (req, res, next) => {
    try {
      const {error} = contactAddSchema.validate(req.body)
      if (error) {
        res.status(400).json({message: "missing required name field"})
        return
      }
      const result = await contacts.addContact(req.body)
      res.status(201).json(result)
    } catch (error) {
        res.status(500).json({
        message: error.message
      })
    }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const result =  await contacts.removeContact(id)
    if (!result) {
      const error = new Error("Not Found")
      error.status = 404
      throw error
  }
  res.status(200).json({
    message: "contact deleted"
  })
  } catch (error) {
      res.status(500).json({
      message: error.message
    })
  }
})

router.put('/:id', async (req, res, next) => {
  try {
      const {error} = contactAddSchema.validate(req.body)
      if (error) {
        res.status(400).json({message: "missing fields"})
        return      
      }
      const {id} = req.params
      const result = await contacts.updateContactById(id, req.body)
      if (!result) {
        res.status(404).json({
          message: "Not Found"
        })
      }
      res.json(result)
    } catch (error) {
        res.status(500).json({
        message: error.message
      })
    }
})

module.exports = router

