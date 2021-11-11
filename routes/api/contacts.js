const express = require('express')
const { joiSchema, joiSchemaUpdate } = require('../../model/Schemas/contact')

const {
  listContacts,
  getContactsById,
  removeContact,
  addContact,
  updateContactById,
  updateStatusContact,
} = require('../../model/index')

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
    const result = await getContactsById(contactId)
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

    if (error) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Missing required name field'
      })
      return
    }
    const result = await addContact(req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Add new contact',
      data: {
        result
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
        message: `Contacts whith id=${contactId} not found`
      })
      return
    }
    res.json({
      status: 'success',
      code: 200,
      message: `Contact whith id=${contactId} deleted `,
    })
  } catch (error) {
    next(error)
  }
})

// ------------------------PUT updateContactById-------------------
router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = joiSchemaUpdate.validate(req.body)
    if (error) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Missing field favorite'
      })
      return
    }
    const { contactId } = req.params
    const result = await updateContactById(contactId, req.body)
    if (!result) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found'
      })
      return
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'Update contact',
      data: {
        result
      },
    })
  } catch (error) {
    next(error)
  }
})

// ------------------------PATCH favorite-------------------
router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (!error) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Missing field favorite'
      })
      return
    }
    const { contactId } = req.params
    const { favorite } = req.body
    const result = await updateStatusContact(contactId, { favorite })

    if (!result) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Contact not found'
      })
      return
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'Update status contact',
      data: {
        result
      },
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
