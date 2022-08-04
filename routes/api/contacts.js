const express = require('express');
const Joi = require('joi');

const router = express.Router()
const contactsFun = require("../../models/contacts");

const { createError } = require("../../helpers");

const addContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),

})
const updateContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string().length(10).pattern(/^[0-9]+$/),

})




router.get('/', async (req, res, next) => {
  try {
    const list = await contactsFun.listContacts();
  res.json(list);
    
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId;
  const contact = await contactsFun.getContactById(id);
    if (!contact) {
      throw createError(404,"Not found")
    }
    res.json( contact);
  } catch (err) {
    next(err);
}
})

router.post('/', async (req, res, next) => {
  try {
    const {error}=addContactSchema.validate(req.body)
    if (error) {
      throw createError(400,"missing required name field")
    }
    const contact = await contactsFun.addContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
   next(error);
  }
  
})

router.delete('/:contactId', async (req, res, next) => {
  try { 
    const delateContact = await contactsFun.removeContact(req.params.contactId);
    
    if (!delateContact) {
      throw createError(404,"Not found")
    }
    res.json({ message : "contact deleted" });

  } catch(error)
  {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const {error}=updateContactSchema.validate(req.body)
    if (error || Object.keys(req.body).length === 0) {
      throw createError(400,"missing fields")
    }
    const contact = await contactsFun.updateContact(req.params.contactId, req.body)
    if (!contact) {
      throw createError(404,"Not found")
    }
    res.json(contact)
    
  } catch (error) {
    next(error)
  }
})

module.exports = router
