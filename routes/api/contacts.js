const express = require('express')

const operations = require("../../models/contacts");


const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await operations.listContacts();
    res.json(contacts);
    console.log('req:', req.body);
  }
  catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'contactID get' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'post req' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'delete req' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'put req message' })
})

module.exports = router
