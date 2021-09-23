const express = require('express')

const {contactSchema} = require('../../schemas')
const contactsOperations = require('../../model/contacts')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try{
    const contacts = await contactsOperations.listContacts()
    res.json({
      contacts
    })
  }
  catch(error){
    next(error)
    }
  })

router.get('/:contactId', async (req, res, next) => {
  try{
    const {id} = req.params
    const result = await contactsOperations.getContactById(id)
    if(!result){
      const error = new Error(`Product with id=${id} not found`)
      error.status = 404
      throw error
      // res.status(404).json({
      //   status: 'error',
      //   code: 404,
      //   message: `Product with id=${id} not found`
      // })
      // return
    }
    res.json({
      status: 'success',
      code: 200,
      data:{
        result
      }
    })
  }
  catch(error){
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try{
    const {error} = contactSchema.validate(req.body)
    if(error){
      const err = new Error(error.message)
      err.status = 400
      throw err
    }
    const result = await contactsOperations.addContact(req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result
      }
    })
  }
  catch(error){
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try{
    const {error} = contactSchema.validate(req.body)
    if(error){
      const err = new Error(error.message)
      err.status = 400
      throw err
    }
    const {id} = req.params
    const result = await contactsOperations.updateContacts(req.body)
    if(!result) {
      const error = new Error(`Clntact with id=${id} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'succes',
      code: 200,
      data:{
        result
      }
    })
  }
  catch(error){
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try{
    const {id} = req.params
    const result = await contactsOperations.removeContact(id)
    if(!result){
      const error = new Error(`Contact with id=${id} not found`)
      error.status = 404
      throw error
    }
    res.json ({
      status: 'success',
      code: 200,
      message: 'Success delete'
    })
  }
  catch(error){
    next(error)
  }
})

module.exports = router
