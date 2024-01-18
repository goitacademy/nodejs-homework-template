const express = require('express')
const Joi = require("@hapi/joi")

const router = express.Router()
const handler = require('./handlers')
// const contacts1 = require("../models/contacts.json")

router.use('/', handler)
const schema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    phone: Joi.number()        
        .required()

})

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
    
    const result = schema.validate(req.body)    
  if (result.error) {
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
 
    const result = schema.validate(req.body)   
  
    if (result.error) {
      
    return res.status(400).send({ message: "missing fields" })
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
