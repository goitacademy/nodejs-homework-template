const express = require('express')
const {
  listContacts,
  getContactByID,
  addContact,
  removeContact,
} = require("./models/contacts.js");

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts
      }
  })
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error"
    })
  }
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
