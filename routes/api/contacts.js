const express = require('express')
const router = express.Router()
const Contacts = require('../../model/index')
const { validateContact, validateId } = require('./validations')

router.get('/', async (req, res, next) => {
  try {
    console.log(req.method)
    const allContacts = await Contacts.listContacts()
    res.json({ status: 'success', code: 200, data: { allContacts } })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', validateId, async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId)
    if (contact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contact } })
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found contact' })
  } catch (error) {
    next(error)
  }
})

router.post('/', validateContact, async (req, res, next) => {
    try {
    const contact = await Contacts.addContact(req.body)
    res.status(201).json({ status: 'success', code: 201, data: { contact } })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', validateId, async (req, res, next) => {
    try {
    const contact = await Contacts.removeContact(req.params.contactId)
    if (contact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contact } })
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found contact' })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', validateId, validateContact, async (req, res, next) => {
  try {
      const contact = await Contacts.updateContact(req.params.contactId, req.body)
      if (contact) {
        return res
          .status(200)
          .json({ status: 'success', code: 200, data: { contact } })
      }
      return res
        .status(404)
        .json({ status: 'error', code: 404, message: 'Not Found contact' })
    } catch (error) {
      next(error)
    }
})

module.exports = router
