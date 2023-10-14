
const express = require('express');
const contacts = require('../../models/contacts');
const Joi = require('joi');

const router = express.Router();

const schema = Joi.object({
  name:Joi.string().alphanum().min(2).required(),
  email:Joi.string().email().required(),
  phone:Joi.string().min(2).required(),
})

router.get('/', async (req, res, next) => {
  try {
  const allContacts = await contacts.listContacts();
  res.json(allContacts);
  } catch(e) {
    next(e);
}  
})

router.get('/:contactId', async (req, res, next) => {
  try {
  const contactId = req.params.contactId;  
  const contact = await contacts.getContactById(contactId);
  if (!contact) {
    res.status(404).json({"message": "Not found"});
  } else {
    res.json(contact);
  }  
  } catch(e) {
    next(e);
}   
})

router.post('/', async (req, res, next) => {  
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({"message": "missing required field"});
    } else {
      const {name, email, phone} = req.body;
  const contact=await contacts.addContact(name, email, phone);
  res.status(201).json(contact);
    }  
  } catch(e) {
   next(e);
}    
})

router.delete('/:contactId', async (req, res, next) => {
try {
 const contactId = req.params.contactId;
  const contact = await contacts.removeContact(contactId);
  if (!contact) {
    res.status(404).json({"message": "Not found"});
  } else {
    res.status(200).json({"message": "contact deleted"});
  }  
  } catch(e) {
   next(e);
}    
})

router.put('/:contactId', async (req, res, next) => {
  try {
  const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({"message": "missing fields"});
    } else {
      const body = req.body;
  const contactId = req.params.contactId;
  
  const contact = await contacts.updateContact(contactId, body);
  if (!contact) {
    res.status(404).json({"message": "Not found"});
  } else {
    res.json(contact);
  }    
    } 
  } catch(e) {
   next(e);
}    
})

module.exports = router
