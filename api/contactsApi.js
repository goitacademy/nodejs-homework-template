const express = require('express')
const router = express.Router()
const {
  validateCreateContact,
  validateUpdateContact,
} = require('./validation_schema')
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../model/index')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts()

    return res.json({ status: 'success', code: 200, data: { contacts } })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await getContactById(contactId)

    if (!contact) {
      return res
        .status(404)
        .json({ status: 'error', code: 404, message: 'Not found' })
    }

    return res.json({ status: 'success', code: 200, data: { contact } })
  } catch (error) {
    next(error)
  }
})

router.post('/', validateCreateContact, async (req, res, next) => {
  try {
    const contact = await addContact(req.body)

    return res
      .status(201)
      .json({ status: 'success', code: 201, data: { contact } })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await removeContact(contactId)

    if (result) {
      return res.json({
        status: 'success',
        code: 200,
        message: 'contact deleted',
      })
    }

    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' })
  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId', validateUpdateContact, async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await updateContact(contactId, req.body)

    if (!contact) {
      return res
        .status(404)
        .json({ status: 'error', code: 404, message: 'Not found' })
    }

    return res
      .status(200)
      .json({ status: 'success', code: 200, data: { contact } })
  } catch (error) {
    next(error)
  }
})

module.exports = router
