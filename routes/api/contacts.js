const express = require('express')

const contactsOperations=require('../../models/contacts')

const router = express.Router()

const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string()
    .min(7)
    .max(14)
    .required()
})

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()
    res.json(contacts)
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await contactsOperations.getContactById(contactId)
    if (!contact) {
      res.status(404).json({
        message:'Not found'
      })
      return
    }
    res.json(contact)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body
    const {error}=schema.validate(req.body)
    if (error) {
      return res.status(400).json({
        message: error.message,
      })
    }
    const result=await contactsOperations.addContact(name, email, phone)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const {contactId}=req.params
    const removeContact = await contactsOperations.removeContact(contactId)
    if(!removeContact) return res.status(404).json({
        message: `Not found`,
      })
    res.json({message: "contact deleted"})
  } catch (error) {
    next(error)
  }
  
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params
    const {error}=schema.validate(req.body)
    if (error) {
      return res.status(400).json({
        message: error.message,
      })
    }
    const contact = await contactsOperations.updateContact(contactId, req.body)
    if(!contact) return res.status(404).json({
        message: `Not found`,
      })
    res.json(contact)
  } catch (error) {
    next(error)
  }
  
})

module.exports = router
