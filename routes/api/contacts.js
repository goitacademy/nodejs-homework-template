const express = require('express')
const router = express.Router()
const Contacts = require('../../model/contacts')
const { ValidCreateContact,
        ValidUpdateEmailContact,
        ValidUpdateAllContact } = require('./validContactsRoute.js')

router.get('/', async (req, res, next) => {
  try {
     const contacts = await Contacts.listContacts()
     return res.json({
       status: 'success',
       code: 200,
       data: {
          contacts,
       }
     })
  } catch (error) {
    next(error)
  }
  
})

router.get('/:id', async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.id.toString())
    if(contact){
      return res.status(201).json({
        status: 'success',
        code: 201,
        data: {
           contact,
        }
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found'
    })
    }
   } catch (error) {
   next(error)
 }
})

router.post('/', ValidCreateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body)
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {
         contact,
      }
    })
  } catch (error) {
   next(error)
 }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.id.toString())
    if(contact){
      return res.status(201).json({
        status: 'success',
        code: 200,
        data: {
           contact,
        }
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found'
    })
    }
   } catch (error) {
   next(error)
 }
})

router.patch('/:id', ValidUpdateEmailContact, async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(req.params.id.toString(), req.body)
    if(contact){
      return res.status(201).json({
        status: 'success',
        code: 201,
        data: {
           contact,
        }
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found'
    })
    }
   } catch (error) {
   next(error)
 }
})

router.put('/:id', ValidUpdateAllContact, async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(req.params.id.toString(), req.body)
    if(contact){
      return res.status(201).json({
        status: 'success',
        code: 201,
        data: {
           contact,
        }
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found'
    })
    }
  } catch (error) {
    next(error)
    return res.status(404).json({
      status: 'error',
      code: 404,
      data: 'Not Found'
    })
 }
})

module.exports = router
