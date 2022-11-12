const express = require('express')
const methods = require('../../models/contacts')
const validation = require('../../validation/validation')
const {
  validate
} = require('../../validation/validationMiddleware')

const router = express.Router()

router.get('/', async (req, res, next) => {
  const contacts =  await methods.listContacts()
  res.json({ 
    status: 'success',
    code: 200,
    data: {
      contacts,
    }
   })
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const contacts = await methods.getContactById(contactId)
  res.json({ 
    status: 'success',
    code: 200,
    data: {
      contacts,
    }
  })
})
//, 
router.post('/', validate(validation.contact), async (req, res, next) => {
  const {name, email, phone } = req.body
  const contacts = await methods.addContact(name, email, phone)
  res.json({ 
    status: 'success',
    code: 200,
    data: {
      contacts,
    }
  })
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const contacts = await methods.removeContact(contactId)
  res.json({ 
    status: 'success',
    code: 200,
    data: {
      contacts,
    }
  })
})

router.put('/:contactId', validate(validation.contact), async (req, res, next) => {
  const { contactId } = req.params
  const contacts = await methods.updateContact(contactId, req.body)
  res.json({ 
    status: 'success',
    code: 200,
    data: {
      contacts,
    }
  })
})

module.exports = router
