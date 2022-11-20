const express = require('express')
const router = express.Router()
const functions = require('../../models/contacts.js')
const { contactValidation } = require('../../validation/contact.validation.js')

router.get('/', async (_, res) => {
  functions.listContacts()
    .then(contacts => res.json(contacts))
})

router.get('/:contactId', async (req, res) => {
  functions.getContactById(req.params.contactId)
    .then(contact => {
      if (contact) {
        res.json(contact)
      } else {
        res.status(404).json({ message: 'Not found' })
      }
    })
})

router.post('/', async (req, res) => {
  const { error } = contactValidation(req.body)
  if (error) {
    res.status(400).json({ message: 'invalid data' })
  } else {
    functions.addContact(req.body)
      .then(contact => {
        if (contact) {
          res.status(201).json(contact)
        } else {
          res.status(400).json({ message: 'missing required name field' })
        }
      })
  }
})

router.delete('/:contactId', async (req, res) => {
  functions.removeContact(req.params.contactId)
    .then(resp => {
      if (resp) {
        res.json({ message: 'contact deleted' })
      } else {
        res.status(404).json({ message: 'Not found' })
      }
    })
})

router.put('/:contactId', async (req, res) => {
  const { error } = contactValidation(req.body)
  if (error) {
    res.status(400).json({ message: 'invalid data' })
  } else { 
    if (Object.keys(req.body).length) {
      functions.updateContact(req.params.contactId, req.body)
        .then(contact => {
          if (contact) {
          res.json(contact)
          } else {
          res.status(404).json({ message: 'Not found' })
          }
        })
    } else {
      res.status(400).json({ message: 'missing fields' })
    }
  }
})

module.exports = router
