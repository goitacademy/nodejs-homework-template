const express = require('express')
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require('../../model')
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.status(200).json({ contacts })
  } catch (error) {
    res.status(500).json({
      message:
        process.env.NODE_ENV === 'development'
          ? error.message
          : 'Something went wrong'
    })
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await getContactById(+contactId)
    if (contact) {
      res.status(200).json({ contact })
    } else {
      res.status(404).json({
        message: 'Not found'
      })
    }
  } catch (error) {
    res.status(500).json({
      message:
        process.env.NODE_ENV === 'development'
          ? error.message
          : 'Something went wrong'
    })
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body
    if (name && email && phone) {
      const contact = await addContact(req.body)
      res.status(201).json({ ...contact })
    } else {
      res.status(400).json({ message: 'missing required name field' })
    }
  } catch (error) {
    res.status(500).json({
      error:
        process.env.NODE_ENV === 'development'
          ? error.message
          : 'Something went wrong'
    })
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const isRemove = await removeContact(+contactId)
    if (isRemove) {
      res.status(200).json({ message: 'contact deleted' })
    } else {
      res.status(404).json({
        message: 'Not found'
      })
    }
  } catch (error) {
    res.status(500).json({
      error:
        process.env.NODE_ENV === 'development'
          ? error.message
          : 'Something went wrong'
    })
  }
})

router.patch('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const body = req.body
    if (body) {
      const response = await updateContact(+contactId, body)
      if (response) {
        res.status(200).json({ ...response })
      } else {
        res.status(404).json({ message: 'Not found' })
      }
    } else {
      res.status(400).json({ message: 'missing fields' })
    }
  } catch (error) {
    res.status(500).json({
      error:
        process.env.NODE_ENV === 'development'
          ? error.message
          : 'Something went wrong'
    })
  }
})

module.exports = router
