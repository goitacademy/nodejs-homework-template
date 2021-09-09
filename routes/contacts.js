const express = require('express')
const router = express.Router()

// const { contactSchema, joiContactSchema } = require('../../models/contact')
const { validation } = require('../../middlewares')
const contactsOperations = require('../../controllers/contactsData')
const { Contact } = require('../../models')

const validationMiddleware = validation(joiContactSchema)

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contact.find({})
    res.json({
      status: 'success',
      code: 200,
      data: {
        contacts
      }
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await Contact.findById(contactId)
    if (!contact) {
      return res.status(404).json({
        message: 'not found'
      })
    }
    res.json({
      contact
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', validationMiddleware, async (req, res, next) => {
  try {
    // const { error } = contactSchema.validate(req.body)
    // if (error) {
    //   return res.status(400).json({
    //     message: 'missing required name field'
    //   })
    // }
    const result = await Contact.create(req.body)
    res.status(201).json({
      result
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', validationMiddleware, async (req, res, next) => {
  try {
    // const { error } = contactSchema.validate(req.body)
    // if (error) {
    //   return res.status(400).json({
    //     message: 'missing required name field'
    //   })
    // }
    const { contactId } = req.params
    const updateContact = await Contact.findByIdAndUpdate(contactId, req.body)
    if (!updateContact) {
      return res.status(404).json({
        message: 'Not found'
      })
    }
    res.status(200).json({
      updateContact
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const deleteContact = await Contact.findByIdAndDelete(contactId)
    if (!deleteContact) {
      return res.status(404).json({
        message: 'not found'
      })
    }
    res.json({
      deleteContact,
      message: 'contact deleted'
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
