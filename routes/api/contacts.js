const express = require('express')
const router = express.Router()

const { contactSchema } = require('../../validation')
const contactsOperations = require('../../contactsData')
// console.log(contactsOperations)

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()
    // console.log(contacts)
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
    const contact = await contactsOperations.getContactById(contactId)
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
  // res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  try {
    // console.log(req.body)
    const { error } = contactSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        message: 'missing required name field'
      })
    }
    const newContact = await contactsOperations.addContact(req.body)
    console.log(newContact)
    res.status(201).json({
      newContact
    })
  } catch (error) {

  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    console.log(req.body)
    const { error } = contactSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        message: 'missing required name field'
      })
    }
    const { contactId } = req.params
    console.log(contactId)
    const updateContact = await contactsOperations.updateContact(contactId, req.body)
    console.log(updateContact)
    res.status(200).json({
      updateContact
    })
  } catch (error) {

  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const deleteContact = await contactsOperations.removeContact(contactId)
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
  // res.json({ message: 'template message' })
})

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.patch('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

module.exports = router
