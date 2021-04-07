const express = require('express')
const router = express.Router()
const contactsList = require('../../model/index')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsList.listContacts()
    return res.json({
      status: 'success',
      code: 200,
      message: 'All contacts',
      data: {
        contacts
      },
    })
  } catch (e) {
    next(e)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await contactsList.getContactById(contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        message: 'One contact',
        data: {
          contact
        }
      })
    } else {
      return res.json({
        status: 'error',
        code: 404,
        message: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
      return res.json({
        status: 'error',
        code: 400,
        message: 'missing required name field',
      })
    } else {
      const addContact = await contactsList.addContact(req.body)
      return res.json({
        status: 'success',
        code: 201,
        data: {
          addContact,
        }
      })
    }
  } catch (e) {
    next(e)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const deleteContact = await contactsList.removeContact(req.params.contactId)
    if (deleteContact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          deleteContact,
        }
      })
    } else {
      return res.json({
        status: 'error',
        code: 404,
        message: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
})

router.patch('/:contactId', async (req, res, next) => {
  try {
    if (req.body) {
      const changeContact = await contactsList.updateContact(req.params.id, req.body)
      if (changeContact) {
        res.json({
          status: 'success',
          code: 200,
          data: {
            changeContact
          },
        })
      } else {
        res.json({
          status: 'error',
          code: 404,
          message: 'Not Found'
        })
      }
    } else {
      res.json({
        status: 'error',
        code: 400,
        message: 'missing fields',
      })
    }
  } catch (e) {
    next(e)
  }
})

module.exports = router
