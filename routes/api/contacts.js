const express = require('express')

const router = express.Router()
const createError = require('http-errors')
const Joi = require('joi')
const contactsOperations = require('../../models/contacts')

const contactsSchema = Joi.object({
  name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required().min(10)
})

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts
    }
  })
  } catch (error) {
    next(error)
  }
  
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contactById = await contactsOperations.getContactById(contactId)
    if (!contactById) {
      throw createError(404, `Contact with id: ${contactId} not found `)
   
     }
    res.json({
      status: "success",
      code: 200, 
      data: {
        result: contactById
      }
    })
 } catch (error) {
    next(error)
 }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body)
    if (error) {
      error.status(400)
      throw error
     }
    const result = await contactsOperations.addContact(req.body)
     
    res.status(201).json({
      status: "success",
      code: 201, 
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
 try {
   const { contactId } = req.params;
   const result = await contactsOperations.removeContact(contactId)
   if (!result) { throw createError(404, `Contact with id: ${contactId} not found `) }
   res.json({
     status: "success",
     code: 200, 
       message: "contact deleted",
      data: {
        result
      }
   })
 
 } catch (error) {
   next(error)
 }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
  const { error } = contactsSchema.validate(req.body)
  if (error) {
    error.status(400)
    throw error
    }    
    const result = await contactsOperations.updateContact(contactId, req.body)
    if (!result) {
      throw createError(404, `Contact with id: ${contactId} not found `)
   
     }
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }

})

module.exports = router
