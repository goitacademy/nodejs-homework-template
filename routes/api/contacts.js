const express = require('express')
const { error } = require('node:console')
const fs = require("node:fs/promises")
const path = require("node:path")
const app = express()
const Joi = require('joi'); 


const { listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact
} = require("../../models/contacts.js");
  
const contactSchema = Joi.object({
  "name": Joi.string().required(),
    "email": Joi.string().email().required(),
    "phone": Joi.required()
})  
const contactUpdateSchema = Joi.object({
  "id": Joi.required(),
  "name": Joi.string().required(),
  "email": Joi.string().email().required(),
  "phone": Joi.required()
})  

const router = express.Router()

router.get('/', async (req, res, next) => {
  try { 
  const data = await listContacts()
  res.status(200).send(data)}
  catch(err) {
    next(error);
 }
  
})

router.get('/:contactId', async (req, res, next) => {
  const id = req.params['contactId'];
  const data = await getContactById(id)
  if (data !== null) {
    res.status(200).send(data)
  } else {
    res.status(404).json({ "message": "Not found" })
  }
})

const jsonParser = express.json();
router.post('/', jsonParser, async (req, res, next) => {
  const { error, value } = contactSchema.validate(req.body);
  const newContact = await addContact(value);
  if (typeof error !== 'undefined') {
    res.status(400).json(error.details[0].message);
  } else (
     res.status(201).send(newContact)
  )
})

router.delete('/:contactId', async (req, res, next) => {
  const id = req.params['contactId'];
  await removeContact(id);
  id
      ? res.status(200).json({message: "Contact deleted"})
      : res.status(404).json({message: "Not found"})
})

router.put('/:contactId', async (req, res, next) => {
  const id = req.params['contactId'];
  const { error, value } = contactUpdateSchema.validate(req.body);
  if (typeof error !== 'undefined') {
    res.status(400).json({message: "missing fields"});
  }
  try { 
  const data = await updateContact(id,value)
  res.status(200).send(data)}
  catch(err) {
    next(error);
 }
  
})

module.exports = router
