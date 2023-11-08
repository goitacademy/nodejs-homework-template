const express = require('express')
const Joi = require('joi')
const contacts = require('../../models/contacts')
const {HttpError} = require('../../helpers')
const router = express.Router()

const addSchemas = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts()
    res.json(result)
  }
  catch(error) {
    next(error)
    // res.status(500).json({
    //    message: 'Server error' 
    // })
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const result = await contacts.getContactById(id)
    if(!result) {
      throw HttpError(404, 'Not found')
      // const error = new Error('Not found')
      // error.status = 404
      // throw error

      // return res.status(404).json({
      //   massage: 'Not found'
      // })
    }
    res.json(result)
  }
  catch(error) {
    next(error)
    // const {status = 500, message= 'Server error'} = error
    // res.status(status).json({
    //    message
    // })
  }
})

router.post('/', async (req, res, next) => {
  try{
    const {error} = addSchemas.validate(req.body)
    if(error){
      throw HttpError(400, `missing required ${error.details[0].context.key} field`)
    }
   const result = await contacts.addContact(req.body)
   res.status(201).json(result)
  }
  catch(error) {
    next(error)
  }
})


router.delete('/:id', async (req, res, next) => {
  try{ 
   const {id} = req.params
   const result = await contacts.removeContact(id)
   console.log(result)
   if(!result) {
    throw HttpError(404, 'Not found')
   }
   res.json({
    message: "contact deleted"
   })
  }
  catch(error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try{
    const {error} = addSchemas.validate(req.body)
    if(error){
      throw HttpError(400, "missing fields")
    }    
   const {id} = req.params
   const result = await contacts.updateContact(id, req.body)
   if(!result) {
    throw HttpError(404, 'Not found')
   }
   res.json(result)
  }
  catch(error) {
    next(error)
  }
})

module.exports = router
