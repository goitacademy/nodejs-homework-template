const express = require('express')

const router = express.Router()
const handler = require('./handlers')
// const contacts1 = require("../models/contacts.json")

router.use('/', handler)

router.get('/', async (req, res, next) => {
  // res.json(contacts1).status(200)
  const contacts = handler.listContacts();  
  res.send(contacts).status(200)
  
  
})


router.get('/:contactId', async (req, res, next) => {
  const contact = handler.getById(req.params.contactId);
  if (!contact) {
    return res.status(404).send({ message: "Not found" })
  }
  res.status(200).send(contact)
})


router.post('/', (req, res, next) => {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  };
  if (!contact.name || !contact.email || !contact.phone) {
    return res.status(400).send({ message: "missing required name - field"})
  } else {
  handler.addContact(contact);  
  res.status(201).send(contact)
  }
  
})

router.delete('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId
    const validate = handler.validate(contactId);
    
  if (!validate) {
    
    return res.status(404).send({ message: "Not found" })
  } else {
    
  handler.removeContact(contactId);
  res.status(200).send({ message: "contact deleted"})
    }
})

router.put('/:contactId', async (req, res, next) => {
    const contactId = req.params.contactId
     const body = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  };
 
  
  if ( body.name === undefined) {
    return res.status(400).send({ message: "missing field name" })
  }
  if (body.email === undefined) {
    return res.status(400).send({ message: "missing field email" })
  }
  if ( body.phone  === undefined) {
    return res.status(400).send({ message: "missing field phone" })
    }
    const contact = handler.validate(contactId)
  if (contact) {
    handler.updateContact(contactId, body)
    return res.status(200).json(contact)
  }
  else {
    return res.status(404).json("Not found")
   
  }
  
  

})

module.exports = router
