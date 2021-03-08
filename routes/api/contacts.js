const express = require('express')
const router = express.Router()
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model/contacts')
const validation = require('./validation')

router.get('/', async (_req, res, next) => {
  try {
    const contacts = await listContacts()
    return res.json({
      status: 'success',
      code: 200,
      message: {
        contacts
      },
    })
  } catch (e) {
    next(e)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        message: { contact },
      })
    } else {
      return res.status(404).json({
        status: 'Not Found',
        code: 404,
        message: 'The contact not found',
      })
    }
  } catch (e) {
    next(e)
  }
})

router.post('/', validation.addContact, async (req, res, next) => {
  try {
    const contact = await addContact(req.body)
    return res.status(201).json({
      status: 'success',
      code: 201,
      message: {
        contact
      },
    })
  } catch (e) {
    next(e)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId)
    if (contact) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        message: 'The contact deleted'
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'The contact not found',
      })
    }
  } catch (e) {
    next(e)
  }
})

router.patch(
  '/:contactId',
  validation.updateContact,
  async (req, res, next) => {
    try {
      const contact = await updateContact(req.params.contactId, req.body)
      if (contact) {
        return res.json({
          status: 'success',
          code: 200,
          message: {
            contact
          },
        })
      } else {
        return res.status(404).json({
          status: 'error',
          code: 404,
          message: 'Not Found',
        })
      }
    } catch (e) {
      next(e)
    }
  },
)

module.exports = router
