const schema = require ('../../schemas/validate.js')
const express = require('express')
const { listContacts, getContactById, removeContact, addContact, updateContact} = require ("../../models/contacts.js")

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contact = await listContacts()
    return res.status(200).json ({contact})
  } catch (error) {
    res.status(500).json ({message: error.message})
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId)
    if (contact) { 
      return res.status(200).json({contact})
    }
    return res.status(404).json({message: "id Not Found"})
  } catch (error) {
    console.log(message.error);
  }
})

router.post('/', async (req, res, next) => {
  const { error } = schema.validate(req.body)
  if (error) { 
    return res.status(400).json({message: "bad request"})
  }

  try {
    const data = await addContact(req.body)
    return res.status(200).json(data)
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const deleteContact = await removeContact(req.params.contactId)
    if (deleteContact) { 
      return res.status(200).json({message: "contact has been remove"})
    }
  } catch (error) {
    console.log(message.error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  const { error } = schema.validate(req.body)
  if (error) { 
    return res.status(400).json({message: error})
  }
  const { name, email, phone } = body
  if (!name && !email && !phone) { 
    return res.status(400).json({message: error})
  }

  const results = await updateContact(req.params.contactId, req.body)
  if (results) { 
    return res.json(results)
  } return res.status(400).json({message: error})
})

module.exports = router
