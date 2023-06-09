const express = require('express')

const router = express.Router()

const contacts = require("../../models/contacts");

router.get('/', async (req, res, next) => {
  try {
    data = await contacts.listContacts()
    res.json( { data } );
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  console.log(req.params.contactId)
  try {
    data = await contacts.getContactById(req.params.contactId)
    res.json( { data } );
  } catch (error) {
    next(error)
  }
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
