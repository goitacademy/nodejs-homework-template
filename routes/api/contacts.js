const express = require('express')
const Joi = require("joi")

const contacts = require("../../models/contacts")
const addShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
})

const router = express.Router()

router.get('/', async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result)
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const {id} =req.params;
    const result = await contacts.getContactById(id)
    if(!result) {
      res.status(404) .json({ message: 'Not found' })
     
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
 
})

router.post('/', async (req, res, next) => {
try {
  const {error} =addShema.validate(req.body);
  if(error){
    res.status(404) .json({ message: "missing required name field"})
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
} catch (error) {
  next(error)
}
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const {id} =req.params;
    const result = await contacts.removeContact(id)
    if(!result) {
      res.status(404) .json({ message: 'Not found' })
     
    }
    res.status(200).json({ message: "contact deleted"})
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} =addShema.validate(req.body);
    if(error){
      res.status(400) .json({ message: "missing fields"})
    }
    const{contactId}=req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if(!result){
      res.status(404) .json({ message: 'Not found' })
    }
    res.status(200).json(result);
  } catch (error) {
    next(error)
  }
})

module.exports = router
