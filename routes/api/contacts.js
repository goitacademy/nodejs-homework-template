const express = require('express')
const router = express.Router()
const Contacts = require('../../model/contacts.js')
const {
  validationCreateContact,
  validationUpdateContact }  = require('./validContactRouter')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    return res.json({
      status: 'success',
      code: 200,
      data: {contacts}
    })
    
  } catch (e) {
    next(e)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const user = await Contacts.getContactById(req.params.contactId)
   
    if (user) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          user
        }
      }) 
    }
    else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found'
        })
      }
  
  } catch (e) {
    next(e)
}
})





router.post('/', validationCreateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body)
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {contact}
    })
  }
  catch (e) {
    next(e)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const deleteUser = await Contacts.removeContact(req.params.contactId)
    if (deleteUser) {
      return res.json({
        status: 'success',
        code: 200,
        data: {"message": "contact deleted"}
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: { "message": "Not found"}
      })
    }
  } catch (e) {
    next (e)
 }
})

router.patch('/:contactId', validationUpdateContact, async (req, res, next) => {
   try {
    const contact = await Contacts.updateContact(req.params.contactId,
      req.body)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {contact}
  })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found'
      })
}
    
  } catch (err) {
    next(err)
  }
})



module.exports = router
