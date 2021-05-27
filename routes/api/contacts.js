const express = require('express')
const { validateCreateContact, validateUpdateContact, validateUpdateStatusContact } = require('../../validation/validate')
const router = express.Router()

const db = require('../../db')
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
} = require('../../model/index.js')

router.get('/api/contacts', async (req, res, next) => {
  try {
    const client = await db
    const contacts = await listContacts(client)
    res.json({
      status: 'success',
      code: 200,
      data: contacts
    })
  } catch (e) {
    next(e)
  }
})

router.get('/api/contacts/:contactId', async (req, res, next) => {
  try {
    const client = await db
    const contact = await getContactById(client, req.params.contactId)
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

router.post('/api/contacts', validateCreateContact, async (req, res, next) => {
  try {
    if (req.body.name && req.body.email && req.body.phone) {
      const client = await db
      const contact = await addContact(client, req.body)
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

router.delete('/api/contacts/:contactId', async (req, res, next) => {
  try {
    const client = await db
    const contactToDelete = await removeContact(client, req.params.contactId)
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

router.patch('/api/contacts/:contactId', validateUpdateContact, async (req, res, next) => {
  try {
    if (req.body.name || req.body.email || req.body.phone) {
      const client = await db
      const updatedContact = await updateContact(client, req.params.contactId, req.body)
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

router.patch('/api/contacts/:contactId/favorite', validateUpdateStatusContact, async (req, res, next) => {
  try {
    if (req.body.favorite) {
      const client = await db
      const updatedContact = await updateStatusContact(client, req.params.contactId, req.body)
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
