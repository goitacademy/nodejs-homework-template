const express = require('express')
const { listContacts, getContactById, addContact, removeContact, updateContact} = require("../../models/contacts");
const router = express.Router()
const Joi = require('joi');

const postSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  phone: Joi.string().required(),
  
});
const putSchema = Joi.object({
  email: Joi.string().email().optional(),
  name: Joi.string().optional(),
  phone: Joi.string().optional().min(10),
  
});

router.get('/', async (req, res, next) => {

  const contacts = await listContacts();
  res.json(contacts);

  
})

router.get('/:contactId', async (req, res, next) => {
  const results = await getContactById(req.params.contactId);//se especifica que es un request con ese parametro que conincide con /:contactId
  if (results.length === 0) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(results[0]);//retorna 304
})

router.post('/', async (req, res, next) => {
  const { error, value } = postSchema.validate(req.body);
 if (error){
  console.error(error.details[0].message);
  return res.status(400).send(error.details[0].message)
 }
  
  const message = await addContact(value)
  res.status(200).json({ message})
})

router.delete('/:contactId', async (req, res, next) => {
  const message = await removeContact(req.params.contactId);
  
  if (message==="Contact deleted"){
    res.status(200).json({ message});
  }else{
    res.status(404).json({ message});
  }
  
})

router.put('/:contactId', async (req, res, next) => {
  const bodyEntry = req.body
 
  if (bodyEntry !== null) {
    const { error, value } = putSchema.validate(req.body);
  if (error){
   console.error(error.details[0].message);
   return res.status(400).send(error.details[0].message)
  }else{

    const message = await updateContact(req.params.contactId, value)
    if (message== "Not found"){
      res.status(404).send(message)
    } else {
    res.json({ message })
    }
  }
  }else{
    return res.status(400).send("missing fields")
  }
  
  
 
  
})

module.exports = router
