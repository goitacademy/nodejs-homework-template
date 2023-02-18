const express = require('express')
const Joi = require('joi')
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts')

const contactValidationSchema =Joi.object({
  name: Joi.string()
        .min(3)
        .max(30),
  email : Joi.string()
        .email(),
  phone: Joi.string()
        .max(14)
})

const router = express.Router()

router.get('/', async (req, res, next) => {
  res.status(200).json(await listContacts())
})

router.get('/:contactId', async (req, res, next) => {
  res.status(200).json(await getContactById(req.params.contactId))
})

router.post('/', async (req, res, next) => {
  const {name, email, phone} = req.body
  if (!name || !phone || !email) return res.status(400).json({"message": "missing required name field"})
  try{
    await contactValidationSchema.validateAsync(req.body)
  }
  catch(err){
    return res.status(400).json({"message": err.message})
  }
  const newId = Date.now()+''
  const newContact = {
    id: newId,
    name: name,
    email: email,
    phone: phone
  }
  addContact(newContact)
res.status(201).json(newContact)
})

router.delete('/:contactId', async (req, res, next) => {
  const result = await removeContact(req.params.contactId);
  if (result==='failure') return res.status(404).json({"message": "Not found"})
  else res.status(200).json({"message": "contact deleted"})
})

router.put('/:contactId', async (req, res, next) => {
  const {name, email, phone} = req.body
  if (!name && !email && !phone) return res.status(400).json({"message": "missing fields"})
  let contact
  try{
    contact = (await contactValidationSchema.validateAsync(req.body))
  }
  catch(err){
    return res.status(400).json({"message": err.message})
  }
  const result = await updateContact(req.params.contactId, contact)

  if (!result) return res.status(404).json({"message": "Not found"})
  return res.status(200).json(result)
})

module.exports = router
