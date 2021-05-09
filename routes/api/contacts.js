const express = require('express')
const router = express.Router()
const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../model')
const validate = require('../../validation')

router.get('/', async (req, res, next) => {
  try {
    const allContacts = await listContacts()
    return res.json({
      status: 'success',
      code: 200,
      data: {
        allContacts
      },
    })
  } catch (err) {
    next(err)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not found',
      })
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', validate.createContact, async (req, res, next) => {
  try {
    const { name, email, phone } = req.body
    await addContact(name, email, phone)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        name,
        email,
        phone
      },
    })
  } catch (err) {
    next(err)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const id = await removeContact(req.params.contactId)
    if (id) {
      res.status(200).json({
        status: 'success',
        code: 200,
        message: 'contact deleted',
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not found',
      })
    }
  } catch (err) {
    next(err)
  }
})

router.patch('/:contactId', validate.updateContact, async (req, res, next) => {
  try {
    if (req.body) {
      const contact = await updateContact(req.params.contactId, req.body)
      if (contact) {
        res.status(200).json({
          status: 'success',
          code: 200,
          data: {
            contact
          },
        })
      } else {
        return res.status(404).json({
          status: 'error',
          code: 404,
          data: 'Not found',
        })
      }
    } else {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'missing fields'
      })
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
