const express = require('express')
const methods = require('../../models/contacts')
<<<<<<< Updated upstream
=======
const validation = require('../../validation/validation')
const {
  validate
} = require('../../validation/validationMiddleware')
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
router.post('/', async (req, res, next) => {
=======
router.post('/', validate(validation.contact), async (req, res, next) => {
>>>>>>> Stashed changes
  const body = req.body
  const contacts = await methods.addContact(body)
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

<<<<<<< Updated upstream
router.put('/:contactId', async (req, res, next) => {
=======
router.put('/:contactId', validate(validation.contact), async (req, res, next) => {
>>>>>>> Stashed changes
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