const express = require('express')
const Joi = require('joi')

const contacts = require('../../models/contacts')

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
})

const router = express.Router()

router.get('/', async (req, res, next) => {
  const result = await contacts.listContacts()
  res.json(result)
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params; 
  const result = await contacts.getContactById(contactId)
  if (!result) {
    return res.status(404).json({
      message: "Not found"
    })
  }
  res.json(result)
}) 

router.post('/', async (req, res, next) => {
  const { error } = addSchema.validate(req.body)
  if (error) {
    return res.status(400).json({"message": "missing required name field"})
  }
  const result = await contacts.addContact(req.body)
  res.status(201).json(result)
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId)
  if (!result) {
    return res.status(404).json({
      "message": "Not found"
    })
  }
  res.status(200).json({ message: 'contact deleted' })
})

router.put('/:contactId', async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name & !email & !phone) {
    return res.status(400).json({"message": "missing fields"})
  };
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body)
  if (!result) {
    res.status(404).json({"message": "Not found"})
  }
  res.status(200).json(result)
})

module.exports = router
