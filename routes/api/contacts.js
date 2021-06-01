const express = require('express')
const { validateCreateContact, validateUpdateContact, validateUpdateStatusContact } = require('../../validation/validate')
const router = express.Router()
const guard = require('../../helpers/guard')

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
} = require('../../model/contacts.js')

router.get('/', guard, async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: contacts
    })
  } catch (e) {
    next(e)
  }
})

router.get('/:contactId', guard, async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId)
    if (contact) {
      res.json({
        status: 'Success',
        code: 200,
        data: contact
      })
    } else {
      res.json({
        code: 404,
        message: 'Not found',
      })
    }
  } catch (e) {
    next(e)
  }
})

router.post('/', guard, validateCreateContact, async (req, res, next) => {
  try {
    if (req.body.name && req.body.email && req.body.phone) {
      const contact = await addContact(req.body)
      res.json({
        status: 'Success',
        code: 201,
        data: contact
      })
    } else {
      res.json({
        code: 400,
        message: 'Missing required name field'
      })
    }
  } catch (e) {
    next(e)
  }
})

router.delete('/:contactId', guard, async (req, res, next) => {
  try {
    const contactToDelete = await removeContact(req.params.contactId)
    if (contactToDelete) {
      res.json({
        code: 200,
        message: 'Contact deleted',
      })
    } else {
      res.json({
        code: 404,
        message: 'Not found',
      })
    }
  } catch (e) {
    next(e)
  }
})

router.patch('/:contactId', guard, validateUpdateContact, async (req, res, next) => {
  try {
    if (req.body.name || req.body.email || req.body.phone) {
      const updatedContact = await updateContact(req.params.contactId, req.body)
      if (updatedContact) {
        res.json({
          status: 'Success',
          code: 200,
          data: updatedContact
        })
      } else {
        res.json({
          code: 404,
          message: 'Not found'
        })
      }
    } else {
      res.json({
        code: 404,
        message: 'Not found'
      })
    }
  } catch (e) {
    next(e)
  }
})

router.patch('/:contactId/favorite', guard, validateUpdateStatusContact, async (req, res, next) => {
  try {
    if (req.body.favorite) {
      const updatedContact = await updateStatusContact(req.params.contactId, req.body)
      if (updatedContact) {
        res.json({
          status: 'Success',
          code: 200,
          data: updatedContact
        })
      } else {
        res.json({
          code: 404,
          message: 'Not found'
        })
      }
    } else {
      res.json({
        code: 400,
        message: 'Missing field favorite'
      })
    }
  } catch (e) {
    next(e)
  }
})

module.exports = router
