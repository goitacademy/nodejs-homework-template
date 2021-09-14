const express = require('express')
const { check, validationResult } = require('express-validator/check')
const router = express.Router()
const contactsServices = require('../../model/index')

router.get('/', async (_req, res, next) => {
  try {
    const contacts = await contactsServices.listContacts()
    res.status(200).json(contacts)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.get(
  '/:contactId',
  [check('id', 'Unknown id').not().isEmpty()],
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      const { id } = req.body
      const contact = await contactsServices.getContactById(id)
      res.status(200).json(contact)
    } catch (error) {
      res.status(404).json({ message: 'Not found' })
    }
  }
)

router.post(
  '/',
  [
    check(
      'name',
      'Name can`t be shorter then 2 and longer then 16 chars'
    ).length({ min: 2, max: 16 }),
    check('email', 'Unvalid email').isEmail(),
    check('phone', 'Unvalid phone').not().isEmpty(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      const contact = await contactsServices.addContact(req.body)
      res.status(201).json(contact)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
)

router.delete(
  '/:contactId',
  [check('id', 'Unvalid id').not().isEmpty()],
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      const { id } = req.body
      const contact = await contactsServices.removeContact(id)
      res.status(200).json({ mesage: 'contact deleted', data: contact })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
)

router.patch(
  '/:contactId',
  [check('id', 'Unvalid id').not().isEmpty()],
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      const contacts = await contactsServices.updateContact(req.body)
      res.status(200).json(contacts)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
)

module.exports = router
