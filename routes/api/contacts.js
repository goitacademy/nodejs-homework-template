const express = require('express')
const Joi = require('joi')

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
} = require('../../model/index')

const joiSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[(][\d]{3}[)]\s[\d]{3}[-][\d]{4}/).required(),
})

const joiSchemaUpdate = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
})

const router = express.Router()

// ----------------------GET listContacts-----------------------
router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.json({
      status: 'success',
      code: 200,
      message: 'Contacts found',
      data: {
        contacts
      },
    })
  } catch (err) {
    next(err)
  }
})

// ---------------------- GET getContactById---------------
router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await getContactById(contactId)
    if (result === void 0) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Contacts not found'
      })
      return
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'Get contacts by id',
      data: {
        result
      },
    })
  } catch (error) {
    next(error)
  }
})

// ------------------------POST addContact----------------------
router.post('/', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    console.log(error)
    if (error) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Missing required name field'
      })
      return
    }
    const contact = await addContact(req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Add new contact',
      data: {
        contact
      },
    })
  } catch (error) {
    next(error)
  }
})

// ------------------------DELETE removeContact-----------------
router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await removeContact(contactId)
    if (!result) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Contacts not found'
      })
      return
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'Contact deleted',
    })
  } catch (error) {
    next(error)
  }
})

// ------------------------PUT updateContactById-------------------
router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = joiSchemaUpdate.validate(req.body)
    console.log(error)
    if (error) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Missing field'
      })
      return
    }
    const { contactId } = req.params
    const result = await updateContactById(contactId, req.body)
    if (!result) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Contacts not found'
      })
      return
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'Update contacts',
      data: {
        result
      },
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
