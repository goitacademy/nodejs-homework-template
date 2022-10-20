const express = require('express')

const router = express.Router()

const contactsOperations = require("../../models/contacts");

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsOperations.listContacts();
    res.json(result)
  } catch {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error",
    })
  }
  next
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
