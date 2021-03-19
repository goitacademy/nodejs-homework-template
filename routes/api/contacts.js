const express = require('express')
const router = express.Router()
const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../model/index');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: 'success',
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId)
    if (contact) {
      res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        }
      })
    }
    else {
      res.status(404).json({
        status: 'Error',
        code: 404,
        message: "Not found",
      })
    }
  }
  catch (error) {
    next(error)
  }

})

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
     let errorMessage = ' missing required'
       if (!name) {
         errorMessage += ' name'
       } 
       if (!email) {
        errorMessage += ' email'
       }
     if (!phone) {
         errorMessage += ' phone'
      }
      errorMessage += ' field'
      
      return res.status(400).json({
        status: 'Error',
        code: 400,
        data: {
          message: errorMessage
        },
      })
    } else {
      const contact = await addContact(req.body)
      return res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          contact,
        },
      })
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId)
    if (contact) {
      res.json({
        status: 'success',
        code: 200,
        message: 'contact deleted',
        data: contact
      })
    } else {
      res.status(404).json({
        status: 'Error',
        code: 404,
        message: 'Not found'
      })
    }
  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId', async (req, res, next) => {
  try {
    if (!req.body) {
      res.status(400).json({ message: 'missing fields' })
    }
    else {
      const data = await updateContact(req.params.contactId, req.body)
      if (data) {
        res.json({
          status: 'success',
          code: 200,
          data,
        })
      }
      else {
        res.status(400).json({
          status: 'Error',
          code: 404,
          message: 'Not found'
        })
      }
    }
  }
  catch (error) {
    next(error)
  }
})

module.exports = router
