const express = require('express')
const router = express.Router()
const Contacts = require('../../model/contacts.js')

router.get('/', async (_req, res, next) => {
  try {
    const data = await Contacts.listContacts()
    return res
      .status(200)
      .json({ status: 'success', code: 200, data })
  } catch (error) {
    next(error)
  } 
}) 
 
router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.id)
    console.log(contact)
    if (contact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, contact })
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found' })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body)
    return res.status(201).json({ status: 'success', code: 201, data: { contact } })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.id)
    if (contact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, message: 'contact deleted', contact })
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found' })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(req.params.id, req.body)
    if (contact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contact } })
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
