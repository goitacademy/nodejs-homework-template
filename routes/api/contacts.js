const express = require('express')
const router = express.Router()
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require('../../model')
const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateContactFavorite
} = require('./contacts-validation')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.status(200).json({
      status: 'success',
      code: 200,
      data: contacts
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await getContactById(contactId)
    if (contact) {
      res.status(200).json({
        status: 'success',
        code: 200,
        data: contact
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found'
      })
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', validateCreateContact, async (req, res, next) => {
  try {
    const { body } = req
    const contact = await addContact(body)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: contact
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await removeContact(contactId)

    if (contact) {
      res.status(200).json({
        status: 'success',
        code: 200,
        message: 'contact deleted',
        data: contact
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found'
      })
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', validateUpdateContact, async (req, res, next) => {
  try {
    const {
      params: { contactId },
      body
    } = req

    const contact = await updateContact(contactId, body)
    if (contact) {
      res.status(200).json({
        status: 'success',
        code: 200,
        data: contact
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found'
      })
    }
  } catch (error) {
    next(error)
  }
})

router.patch(
  '/:contactId/favorite',
  validateUpdateContactFavorite,
  async (req, res, next) => {
    try {
      const {
        params: { contactId },
        body
      } = req

      const contact = await updateContact(contactId, body)
      if (contact) {
        res.status(200).json({
          status: 'success',
          code: 200,
          data: contact
        })
      } else {
        res.status(404).json({
          status: 'error',
          code: 404,
          message: 'Not found'
        })
      }
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
