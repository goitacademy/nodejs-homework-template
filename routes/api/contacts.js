const express = require('express')

const router = express.Router()
const contacts = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  try {
      res.json(await contacts.listContacts());
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Server Error", error: error.message });
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
