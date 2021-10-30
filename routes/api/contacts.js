const express = require('express')
const router = express.Router()
const contactsOperations = require('../../model/contacts')
const { NotFound, BadRequest } = require('http-errors')
const Joi = require('joi')

const joySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})


router.get('/', async (req, res, next) => {
  try {
  const contacts = await contactsOperations.listContacts()
  res.json({  status: 'success',
      code: 200,
      data: {contacts}})
 } catch (error) {
     next(error)
 }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await contactsOperations.getContactById(contactId)
    if (!contactById) {
      throw new NotFound("Not found")
    }
    res.json({
      status: 'success',
      code: 200,
      data: {contactById}
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = joySchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const newContact = await contactsOperations.addContact(req.body)
     res.status(201).json({
     status: 'success',
     code: 201,
     data: {
       newContact
     }
   })
 } catch (error) {
   next(error)
 }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsOperations.removeContact(contactId)
    if (!result) {
      throw new NotFound("Not found")
    }
    res.json({
      status: 'success',
      code: 200,
      message: "contact deleted"
    })
  } catch (error) {
    next()
  }
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  try {
     const { error } = joySchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    
    const {contactId}= req.params
    const newContact = await contactsOperations.updateContactById(contactId, req.body)
    if (!newContact) {
      throw new error("Not found")
    }
      res.status(201).json({
     status: 'success',
     code: 201,
     data: {
       newContact
     }
   })
  } catch (error) {
    next(error)
    
  }
})

module.exports = router
