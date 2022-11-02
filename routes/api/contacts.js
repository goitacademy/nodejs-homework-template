const express = require('express')
const Joi = require("joi")

const contacts = require("../../models/contacts")
const {RequestError} = require("../../helpers")

const router = express.Router();

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  phone:Joi.string().min(10).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required()
})

router.get('/', async (req, res, next) => {

  try {
    const result = await contacts.listContacts()
  res.json(result)
    
  } catch (error) {
    next(error)}
  
})

router.get('/:contactId', async (req, res, next) => {
  try {
    
    const {contactId}= req.params;
    const result =await contacts.getContactById(contactId);
    if (!result){
      throw RequestError(404, "Not found")}
      res.json(result)
  } catch (error) {
    next(error)
  }

})


router.post('/', async (req, res, next) => {
 try {
  const {error} = contactsAddSchema.validate(req.body);
  if(error){
    throw RequestError(400, error.message)
  }

  const result = await contacts.addContact(req.body);
  res.status(201).json(result)
 } catch (error) {
  next(error)
 }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const {contactId}=req.params;
    const result = await contacts.removeContact(contactId);
    if (!result){
      throw RequestError(404, "Not found")}
      res.json(result)
    res.json({
      message:"contact deleted"
    })
  } catch (error) {
    
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = contactsAddSchema.validate(req.body);
    if(error){
      throw RequestError(400, error.message)
    }
    const{contactId} = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if(!result){
      throw RequestError(404, "Not found")
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = router
