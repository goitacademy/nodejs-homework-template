const express = require('express')
const Contacts = require('../../model/contacts.js')
const router = express.Router()
const validate = require('./validation.js')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    return res.json({ 
      status: 'success',
      code: 200,
      data: {
        contacts,
      },
     })
  } catch (err){
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.id)
    if (contact) {
      return res.json({
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
        message: 'Not Found',
      })
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', validate.createContact, async (req, res, next) => {
    try {
    const contact = await Contacts.addContact(req.body)
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        contact,
      }
   }) 
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.id)
    if (contact) {
      return res.json({
        status: 'success',
        code:200,
        message: "contact deleted"
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message:'Not found'
      })
    }
  } catch (err) {
    next(err)
  }
})

router.patch('/:id', validate.updateContact, async (req, res, next) => {
  if (req.body) {
    try {
      const contact = await Contacts.updateContact(req.params.id, req.body)
      if (contact) {
        return res.json({
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
          message:'Not found'
        })
      }
    } catch (err) {
      next(err)
  }
  } else {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message:'missing fields'
    })
}
})

module.exports = router
