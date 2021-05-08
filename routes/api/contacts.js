const express = require('express')
const router = express.Router()
const Contacts = require('../../model/index')
const validate = require('../../services/validation')

router.get('/', async (_req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    return res.json({
      status: 'Success',
      code: 200,
      message: 'Contacts found',
      data: { 
        contacts 
      }
    })

  } catch(error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId)

    if (contact) {
    return res.json({
      status: 'Success',
      code: 200,
      message: 'Contact found',
      data: { 
        contact 
      }
    })
  }

  return res.status(404).json({
    status: 'Error',
    code: 404,
    message: 'Not Found'
  })

  } catch(error) {
    next(error)
  }
})

router.post('/', validate.createContact, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body)
    return res.status(201).json({
      status: 'Success',
      code: 201,
      message: 'Contact created',
      data: { contact }
    })

  } catch(error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId)
    if (contact) {
      return res.json({
        status: 'Success',
        code: 200,
        message: 'Contact deleted',
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'Error',
        code: 404,
        message: 'Not Found',
      });
    }
  } catch (error) {
    next(error);
  }
})


router.patch('/:contactId/name', validate.updateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(req.param.contactId, req.body)
    if (contact) {
      return res.json({
        status: 'Success',
        code: 200,
        message: 'Contact updated successfully',
        data: { 
          contact 
        }
      })
    }
  
    return res.status(404).json({
      status: 'Error',
      code: 404,
      message: 'Not Found'
    })
    
  } catch(error) {
    next(error)
  }
})

module.exports = router
