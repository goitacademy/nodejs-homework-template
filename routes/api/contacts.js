const express = require('express')
const router = express.Router()
const Contacts = require('../../model/index')
const { validationCreateContact, validationUpdateContact } = require('./validation')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    return res.json({ status: 'success', code: 200, data: { contacts } })
  } catch (e) {
    next(e)
  }
  
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId)
    if (contact) {
      return res.json({ status: 'success', code: 200, data: { contact } })
    }
    return res.json({ 
      status: 'error',
      code: 404,
      data: { message: 'Not found' },
    })
  } catch (e) {
    next(e)
  }
})

router.post('/', validationCreateContact, async (req, res, next) => {
  try {
    const contacts = await Contacts.addContact(req.body)
    return res
      .status(201)
      .json({ status: 'success',
       code: 201,
        data: { contacts } 
      })
  } catch (e) {
    next(e)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        message: 'contact deleted',
        data: { contact },
      })
    }
    return res.json({
      status: 'error',
      code: 404,
      message: 'Not found',
    })
  } catch (e) {
    next(e)
  }
})

router.put('/:contactId', validationUpdateContact, async (req, res, next) => {
  try {
    const updatedContacts = await Contacts.updateContact(
      req.params.contactId,
      req.body
    )
    if (updatedContacts) {
      return res.json({
        status: 'success',
        code: 200,
        message: 'Contact updated',
        data: { updatedContacts }
      })
    }
    return res.json({
      status: 'error',
      code: 404,
      message: 'Not found',
    })
  } catch (e) {
    next(e)
  }
})

module.exports = router
