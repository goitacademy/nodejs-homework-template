const express = require('express')

const router = express.Router()
const Joi = require('joi');

const contacts = require('../../models/contacts');
const {RequestError} = require("../../helpers");

const addSchema = Joi.object({
  name: Joi.string().required(), 
  email: Joi.string().email().required(),
  phone: Joi.string().required()
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    if(!result){
      throw RequestError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status).json({"message": error.message})  
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await contacts.getContactById(contactId);
    if(!result){      
      throw RequestError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status).json({"message": error.message})  
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if(error) {
        throw RequestError(400, "missing required name field")
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result)
  } catch (error) {
    res.status(error.status).json({"message": error.message})   
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await contacts.removeContact(contactId);
    if(!result) {
      throw RequestError(404, "Not found")
    }
    res.status(200).json({"message": "contact deleted"});
  } catch (error) {
    res.status(error.status).json({"message": error.message})
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if(error) {
        throw RequestError(400, "missing fields")
    }
    const {contactId} = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if(!result){
        throw RequestError(404, "Not found")
    }
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    res.status(error.status).json({"message": error.message})
    next(error);    
  }
})

module.exports = router
