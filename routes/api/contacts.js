const express = require('express');
const Joi = require('joi');
const router = express.Router();

const contacts = require('../../models/contacts');

const RequestErr = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
}

const bookSchema = Joi.object({
  name: Joi.string().required(), 
  email: Joi.string().required(), 
  phone: Joi.number().required()
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
  
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await contacts.getContactById(contactId);
    if(!result){
      throw RequestErr(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {error} = bookSchema.validate(req.body);
    if(error){
      throw RequestErr(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await contacts.removeContact(contactId);
    if(!result){
    throw RequestErr(404, "Not found");
    } 
    res.json({message:"Contact delete"});
  } catch (error) {
    next(error); 
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = bookSchema.validate(req.body);
    if(error){
      throw RequestErr(400, error.message);
    }

    const {contactId} = req.params;
    const result = await contacts.updateContact(contactId, req.body); 
    if(!result){
      throw RequestErr(404, "Not found");
    }
    res.json(result);  
  } catch (error) {
    next(error);    
  }
})

module.exports = router;
