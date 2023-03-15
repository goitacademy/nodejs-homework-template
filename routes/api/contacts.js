const express = require('express')
const Joi = require('joi')

const validateBody = require('./middlewares/validateBody')
const addContactShema = Joi.object({
  name:Joi.string().required(),
  email: Joi.string().required(),
  phone:Joi.string().required()
})
const schemaUpdate = Joi.object({
  name: Joi.string(),    
  email: Joi.string(),
  phone: Joi.string(),
}).min(1)
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}=require('../../models/contacts')
const router = express.Router()

router.get('/', async (req, res, next) => {
  const data = await listContacts()
 
  res.status(200).send(data)
 
})

router.get('/:contactId', async (req, res, next) => {
  const data = await getContactById(req.params.contactId)
 
  res.send(data)
})

router.post('/', validateBody(addContactShema), async (req, res, next) => {
  const {name, phone, email}= req.body
  
  const data = await addContact(name, email,phone,)
  res.status(201).send(data)
})

router.delete('/:contactId', async (req, res, next) => {
  const data = await removeContact(req.params.contactId)
  res.send(data)
})

router.put('/:contactId',validateBody(schemaUpdate), async (req, res, next) => {
  const data = await updateContact(req.params.contactId, req.body)
  res.send(data)
})

module.exports = router
