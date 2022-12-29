const express = require('express')

const Contacts = require ('../../models/contacts.js')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    return res.status (200).json({contacts: {contacts}})
  } catch (error) {
    res.status(500).json ({message: error.message})
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId)
    if (contact) { 
      return res.status(200).json({ contact: {contact}})
    }
    return res.status(404).json({message: "id Not Found"})
  } catch (error) {
    console.log(message.error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body)
    return res.status(201).json({contact: {contact}})
  } catch (error) {
    console.log(message.error);
  }
  if (error) { 
    return res.status(404).json({message: "missing required name field"})
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.body)
    if (contact) { 
      return res.status(200).json({message: "contact deleted"})
    }
    return res.status(404).json({ message: "Not Found" })
  } catch (error) {
    console.log(message.error);
  }
})

router.put('/:contactId', async (req, res, next) => {

})

module.exports = router
