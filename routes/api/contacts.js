const express = require('express')
const router = express.Router()
const Contacts = require('../../model/contacts')
const {
  validationCreateContact,
  validationUpdateContact
} = require('./validator-router')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    return res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      }
    })
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.id)
    // console.log(req.params);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        }
      })
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: 'Not found'
      })
    }    
  } catch (e) {
    next(e)
  }
})

router.post('/', validationCreateContact, async (req, res, next) => {
  try {
    const contacts = await Contacts.addContact(req.body)
    return res.status(201).json({
      status: "created",
      code: 201,
      data: {
        contacts,
      }
    })
  } catch (e) {
    next(e)
  }
})

router.put('/:id', validationUpdateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(req.params.id, req.body)
    // console.log(req.params);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        }
      })
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: 'Not found'
      })
    }    
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.id)
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        }
      })
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: 'Not found'
      })
    }    
  } catch (e) {
    next(e)
  }
})

router.patch('/:id', validationUpdateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(req.params.id, req.body)
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        }
      })
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: 'Not found'
      })
    }    
  } catch (e) {
    next(e)
  }
})

module.exports = router
