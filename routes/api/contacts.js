const express = require('express')
const db = require('../../models/contacts')
const router = express.Router()
const Joi = require('joi');
const myCustomJoi = Joi.extend(require('joi-phone-number'));

const schemaPut = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30),
  email: Joi.string()
    .email()
    .max(30)
    .min(5),
  phone: myCustomJoi.string().phoneNumber().min(7).max(15),
  id: Joi.valid()
})

const schemaPost = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .required()
    .email()
    .max(30)
    .min(5),
  phone: myCustomJoi.string().phoneNumber().min(7).max(15),
})


router.get('/', async (req, res, next) => {
  try {
    const response = await db.listContacts()
    res.status(200).json({ 'message': response })
  } catch (error) {
    console.error(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  try {
    const response = await db.getContactById(contactId)
    if (response && response.length < 1) return res.status(404).json({ 'message': 'Not found' })
    return res.status(200).json({ message: response })
  } catch (error) {
    console.error(error.message)
    return res.status(404).json({ 'message': 'Not found' })
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { body } = req
    const val = schemaPost.validate(body)
    const { error, value } = val;
    if (error) {
      const { details } = error;
      const [message] = details;
      return res.status(400).json({ 'message': message.message })
    }
    const { email, name, phone } = value
    if (email && name && phone) {
      await db.addContact(value)
      const response = await db.listContacts()
      return res.status(201).json({ 'message': response })
    } else {
      return res.status(400).json({ "message": "missing required name field" })
    }
  } catch (error) {
    console.log(error.message)
  }

})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const newList = await db.removeContact(contactId)
    newList ? res.status(200).json({ 'message': 'deleted' }) : res.status(404).json({ message: 'Not found' })
  } catch (error) {
    console.error(error.message)
    return res.status(404).json({ 'message': "Not found" })
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { body } = req;
    const val = schemaPut.validate(body)
    const { error, value } = val;
    if (error) {
      const { details } = error;
      const [message] = details;
      return res.status(400).json({ 'message': message.message })
    }
    const { email, name, phone } = value
  //  const { name, email, phone } = body;
    if (name || email || phone) {
      const result = await db.updateContact(contactId, body);
      if (result) return res.status(200).json({ 'message': result })
      else return res.status(404).json({ "message": "Not found" })
    }
    else return res.status(400).json({ "message": "missing fields" })
  } catch (error) {
    console.error(error.message)
  }
})

module.exports = router

