const express = require('express')
const router = express.Router()
const Contacts = require('../../model')
const validate = require('./validation')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    res.json({
      status: 'success',
      code: '200',
      data: {
        contacts
      },
    })
  } catch (error) {
    next(error)
  }

})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId)
    if (contact) {
      return res.status(200).json({
        status: 'success',
        code: '200',
        data: {
          contact
        },
      })
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      })
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', validate.createContacts, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body)
    res.status(201).json({
      status: 'success',
      code: '201',
      data: {
        contact
      },
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { name, email, phone } = await Contacts.updateContact(req.params.contactId, req.body)
    if (name || email || phone) {
      return res.json({
        status: 'success',
        code: '200',
        data:
          { name, email, phone }
      },
      )
    }
    return res.json({
      status: 'error',
      code: '404',
      data: 'missing fields'
    })

  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId', validate.updateContact, async (req, res, next) => {
  try {
    const { name, email, phone } = await Contacts.updateContact(req.params.contactId, req.body)
    if (name || email || phone) {
      res.json({
        status: 'success',
        code: '200',
        data:
          { name, email, phone }
      },
      )
    }
  } catch (error) {
    next(error)
  }
})


module.exports = router
