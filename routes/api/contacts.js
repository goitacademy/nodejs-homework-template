const express = require('express')
const router = express.Router()
const Contacts = require('../../model/index')
const { addContact, updateContact } = require('../validation')

// === router GET ===
router.get('/', async (_req, res, next) => {
  try {
    const contactList = await Contacts.listContacts()

    return res
      .status(200)
      .json({ status: 'success', code: 200, data: { contactList } })
  } catch (error) {
    next(error)
  }
})

// === router GET 'Id' ===
router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId)
    if (!contact) {
      return res
        .status(404)
        .json({ status: 'error', code: 404, data: { message: 'Not Found' } })
    }
    return res
      .status(200)
      .json({ status: 'success', code: 200, data: { contact } })
  } catch (error) {
    next(error)
  }
})

// === router POST ===
router.post('/', addContact, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body)

    return res
      .status(201)
      .json({ status: 'success', code: 201, data: { contact } })
  } catch (error) {
    next(error)
  }
})

// === router DELETE 'Id' ===
router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId)
    if (!contact) {
      return res
        .status(404)
        .json({ status: 'error', code: 404, data: { message: 'Not Found' } })
    }
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: { message: 'contact deleted' },
    })
  } catch (error) {
    next(error)
  }
})

// === router PATCH 'Id' ===
router.patch('/:contactId', updateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(req.params.contactId, req.body)
    if (!contact) {
      return res
        .status(404)
        .json({ status: 'error', code: 404, data: { message: 'Not Found' } })
    }
    return res
      .status(200)
      .json({ status: 'success', code: 200, data: { contact } })
  } catch (error) {
    next(error)
  }
})

module.exports = router
